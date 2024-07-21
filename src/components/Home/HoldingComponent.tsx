'use client'
import useHoldingStore from '@/store/Holding'
import React, { useEffect, useState } from 'react'
import CoinHoldingComponent from './CoinHoldingComponent'

const HoldingComponent = () => {
    const { data, fetchData } = useHoldingStore((state) => state)
    const [selectedCoin, setSelectedCoin] = useState<'bitcoin' | 'ethereum'>('bitcoin')

    useEffect(() => {
        if (data.btc.length === 0 || data.eth.length === 0) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <div className='space-y-5 w-full shadow-2xl shadow-gray-400 border border-gray-300 rounded-lg'>
            <CoinHoldingComponent coin={selectedCoin} data={selectedCoin === 'bitcoin' ? data.btc : data.eth} setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
        </div>
    )
}

export default HoldingComponent