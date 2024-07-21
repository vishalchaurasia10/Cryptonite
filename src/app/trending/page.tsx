import TrendingMarket from '@/app/trending/TrendingMarket'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trending | Cryptonite",
    description: "Welcome to Cryptonite, the best place to track trending coins.",
};

const page = () => {
    return (
        <div className="w-full p-3 lg:flex lg:flex-col space-y-10 justify-center items-center">
            <TrendingMarket />
        </div>
    )
}

export default page
