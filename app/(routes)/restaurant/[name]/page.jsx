'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname, useSearchParams } from 'next/navigation'
import React,{useEffect, useState} from 'react'
import Intro from '../_components/intro'
import RestroTabs from '@/app/(routes)/restaurant/_components/RestroTabs'

function RestaurantDetails() {
    const params=usePathname()
    const [restaurant, setRestaurant]=useState()
    useEffect(()=>{
        GetRestaurantDetails(params.split('/')[2])
    },[params])
    const GetRestaurantDetails=(restaurant)=>{
        GlobalApi.GetRestaurantDetails(restaurant).then(res=>
            setRestaurant(res?.restro)
        )
    }
  return (
    <div>
        <Intro restaurant={restaurant}/>
        <RestroTabs restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantDetails