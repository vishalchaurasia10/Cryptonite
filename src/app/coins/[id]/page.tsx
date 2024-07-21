import React from 'react'
import CoinData from './CoinData'

const page = ({ params }: any) => {
    return (
        <div className="w-full p-3 lg:flex lg:flex-col justify-center items-center">
            <CoinData id={params.id} />
        </div>
    )
}

export default page