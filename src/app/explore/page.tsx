import React from 'react'
import ExploreComponent from './ExploreComponent'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explore | Cryptonite",
    description: "Welcome to Cryptonite, the best place to explore new coins.",
};

const page = () => {
    return (
        <div className="w-full p-3 lg:flex lg:flex-col space-y-10 justify-center items-center">
            <ExploreComponent />
        </div>
    )
}

export default page
