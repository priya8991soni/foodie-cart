import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React,{useContext} from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import Link from 'next/link'

function Cart({cart}) {
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext)


    const CalculateCartAmount=()=>{
        let total=0
        cart.forEach(item=>total+=item.price)
        return total.toFixed(2)
    }

    const RemoveItemFromCart=(id)=>{
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(res=>{
            if(res){
                GlobalApi.DeleteItemFromCart(id).then(res=>{
                    toast('item removed')
                    setUpdateCart(!updateCart)
                })
            }
        })
    }
  return (
    <div>
        <h2 className='text-lg font-bold'>{cart[0]?.restro?.name}</h2>
        <div className='mt-5 flex flex-col gap-3'>
            <h2 className='font-bold'>My order</h2>
            {cart && cart?.map((item,index)=>(
                <div key={index} className='flex justify-between gap-8'>
                    <div className='flex gap-2 items-center'>
                    <Image src={item.productImage} 
                    alt={item.productName}
                    width={40} height={40}
                    className='h-[40px] w-[40px] rounded-lg object-cover'/>
                    <h2 className='text-sm'>{item.productName}</h2>
                    </div>
                    <h2 className='font-bold flex gap-2'>{item?.price}
                    <X className='h-4 w-4 text-red-500'
                    onClick={()=>RemoveItemFromCart(item.id)}/>
                    </h2>
                </div>
            ))}
            <Link href={'/checkout?restaurant='+cart[0]?.restro?.name} className='w-full'>
            <Button>Checkout ${CalculateCartAmount()}</Button>
            </Link>
            
        </div>
    </div>
  )
}

export default Cart