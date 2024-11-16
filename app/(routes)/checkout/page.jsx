'use client'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Loader } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'sonner'

function Checkout() {
    const params = useSearchParams()
    const [userName, setUserName] = useState()
    const [Email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [zip, setZip] = useState()
    const [address, setAddress] = useState()
    const {user}=useUser()
    const [cart, setCart] = useState()
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext)
    const [deliveryAmount, setDeliveryAmount] = useState(5)
    const [subTotal, setSubTotal]=useState()
    const [taxAmount, setTaxAmount] = useState()
    const [total,setTotal]=useState()
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        console.log(params.get('restaurant'))
        user && GetUserCart()
    }, [user || updateCart])

    const GetUserCart = () => {
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(res => {
            console.log(res)
            setCart(res.userCarts)
            calculateTotalAmount(res.userCarts)
        })
    }

    const calculateTotalAmount=(cart_)=>{
        let total=0
        console.log(cart_)
        cart_.forEach((item)=>{
            total=total+item.price
        })
        setTaxAmount(total*0.09)
        setSubTotal(total)
        setTotal(total*0.09 + total + deliveryAmount)
    }

    const addToOrder=()=>{
        setLoading(true)
        const data={
            email:user.primaryEmailAddress.emailAddress,
            orderAmount:total,
            restaurantName:params.get('restaurant'),
            userName:user.fullName,
            phone:phone,
            address:address,
            zipCode:zip
        }
         GlobalApi.CreateNewOrder(data).then(res=>{
            const resultId=res.createOrder.id
            if(resultId){
                cart.forEach((item)=>{
                    GlobalApi.UpdateOrderToAddOrderItems(item.productName, item.price, resultId,user.primaryEmailAddress.emailAddress).then(res=>{
                        console.log(res)
                        setLoading(false)
                        toast('Order Added Successfully!')
                        setUpdateCart(!updateCart)
                    },(error)=>{
                        setLoading(false)
                    })
                })
                
            }
         },(error)=>{
            setLoading(false)
         })
    }
    return (
        <div>
            <h2 className='font-bold text-2xl my-5'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3'>
                <div className='md:col-span-2 mx-20'>
                    <h2 className='font-bold text-3xl'>Billing Address</h2>
                    <div className='grid grid-cols-2 gap-10 mt-3'>
                        <Input placeholder='Name' onChange={(e) => setUserName(e.target.value)} />
                        <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-2 gap-10 mt-3'>
                        <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className='mx-10 border'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total ({cart?.length})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'>SubTotal<span>${subTotal}</span></h2>
                        <hr></hr>
                        <h2 className='flex justify-between'>Delivery :<span>${deliveryAmount}</span></h2>
                        <h2 className='flex justify-between'>Tax (9%) :<span>${taxAmount?.toFixed(2)}</span></h2>
                        <hr></hr>
                        <h2 className='font-bold flex justify-between'>Total :<span>${total?.toFixed(2) }</span></h2>
                        {/* <Button onClick={()=>addToOrder()}>
                            {loading?<Loader className='animate-spin'/>: 'Make Payment'}
                           </Button> */}
                           {total>5 && <PayPalButtons style={{ layout: "horizontal" }} 
                           disabled={!(userName && Email && address && zip) || loading}
                           onApprove={addToOrder}
                           createOrder={(data,action)=>{
                            return action.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: total.toFixed(2  )
                                        }
                                    }
                                ]
                            })
                           }}
                           />}
                           
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout