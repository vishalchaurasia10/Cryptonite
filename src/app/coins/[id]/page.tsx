import React from 'react'
import CoinGraph from './CoinGraph'
import CoinInfo from './CoinInfo'

const page = ({ params }: any) => {
    return (
        <div className="w-full p-3 lg:flex lg:flex-col space-y-10 justify-center items-center">
            <CoinGraph id={params.id} />
            <CoinInfo id={params.id} />
        </div>
    )
}

export default page