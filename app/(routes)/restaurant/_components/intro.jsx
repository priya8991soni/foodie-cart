import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React,{useState, useEffect} from 'react'

function Intro({restaurant}) {
    const [totalReviews, setTotalReviews]=useState()
    const [averageRating, setAverageRating]=useState()

    useEffect(()=>{
        restaurant && calculateRating()
    },[restaurant])

    const calculateRating=()=>{
        let total
        let count
        restaurant?.reviews?.forEach((review) => {
            total += review.star
            count++
        })
        setTotalReviews(count)
        const result=total/count
        setAverageRating(result ? result.toFixed(1): 4.5) 
   }
  return (
    <div>
        {restaurant ?
        <Image src={restaurant.banner.url} alt={restaurant.name} width={1000} height={500}
        className='w-full h-[220px] object-cover rounded-xl'
        /> :
        <div className='h-[130px] w-full bg-slate-200 rounded-xl animate-pulse'></div>}
        <h2 className='text-3xl font-bold mt-2'>{restaurant?.name}</h2>
        <div className='flex items-center gap-2'>
            <Image src={'/star.png'} alt='star' width={20} height={20}/>
            <label className='text-gray-500'>{averageRating} ({totalReviews})</label>
        </div>
        <h2 className='text-gray-500 mt-2 flex gap-2 items-center'>
            <MapPin/>{restaurant?.address}</h2>
    </div>
  )
}

export default Intro