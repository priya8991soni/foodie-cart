import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'

function ReviewList({reviewList}) {
    console.log(reviewList)
  return (
    <div className='flex flex-col gap-5'>
        {reviewList ? reviewList.map((review,index)=>(
            <div key={index} className='flex gap-5 items-center border rounded-lg p-5'>
                <Image src={review.profileImage} alt={review.id} height={50} width={50}
                className='rounded-full'/>
                <div>
                    <h2>{review.reviewText}</h2>
                    <ReactRating style={{ maxWidth: 100 }} value={review.star} isDisable={true} />
                    <h2 className='text-sm'>{review.userName} at {review.publishedAt}</h2>

                </div>
            </div>
        )):
        [1,2,3,4].map((item,index)=>{
            return <div className='h-[100px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
        })}
    </div>
  )
}

export default ReviewList