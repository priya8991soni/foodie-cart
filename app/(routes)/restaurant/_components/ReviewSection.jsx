// 'use client'
import React,{useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'

function ReviewSection({restaurant}) {
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState()
    const [reviewList, setReviewList] = useState()
    const {user}=useUser()

    useEffect(()=>{
        restaurant && getReviewList()
    },[restaurant])

    const handleSubmit=()=>{
        const data={
            email:user.primaryEmailAddress.emailAddress,
            profileImage:user.imageUrl,
            userName:user.fullName,
            star:rating,
            reviewText:reviewText,
            RestroSlug:restaurant.slug

        }
        GlobalApi.AddNewReview(data).then(res=>{
            toast('Review Added')
            getReviewList()
        })
    }

    const getReviewList=()=>{
        GlobalApi.GetRestaurantReviews(restaurant.slug).then(res=>{
            setReviewList(res.reviews)
        })
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
        <div className='flex flex-col gap-2 p-5 border rounded-lg shadow'>
            <h2 className='font-bold text-lg '>Add your Review</h2>
            <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
            <Textarea onChange={(e)=>setReviewText(e.target.value)}/>
            <Button disabled={rating==0|| !reviewText }
            onClick={()=>handleSubmit()}
            >Submit</Button>
 
        </div>
        <div className='col-span-2'><ReviewList reviewList={reviewList}/></div>
    </div>
  )
}

export default ReviewSection