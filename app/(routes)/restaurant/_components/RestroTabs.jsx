import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'

function RestroTabs({restaurant}) {
    return (
        <div>
            <Tabs defaultValue="Category" className="w-full mt-10">
                <TabsList>
                    <TabsTrigger value="Category">Category</TabsTrigger>
                    <TabsTrigger value="About">About</TabsTrigger>
                    <TabsTrigger value="Reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="Category">
                    <MenuSection  restaurant={restaurant}/>
                </TabsContent>
                <TabsContent value="About">About</TabsContent>
                <TabsContent value="Reviews">
                    <ReviewSection restaurant={restaurant}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default RestroTabs