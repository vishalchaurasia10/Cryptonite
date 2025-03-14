'use client'
import useHoldingStore from '@/store/Holding'
import React, { useEffect, useState } from 'react'
import CoinHoldingComponent from './CoinHoldingComponent'
import toast, { Toaster } from 'react-hot-toast'
import useThemeStore from '@/store/Theme'

const HoldingComponent = () => {
    const { data, fetchData, loading } = useHoldingStore((state) => state)
    const [selectedCoin, setSelectedCoin] = useState<'bitcoin' | 'ethereum'>('bitcoin')
    const { theme } = useThemeStore()

    useEffect(() => {
        if (data.btc.length === 0 || data.eth.length === 0) {
            fetchData((message: string) => {
                toast.error(message);
            })
        }
    }, [])

    return (
        <>
            {/* <Toaster /> */}
            <div className={`space-y-5 w-full rounded-lg  ${theme == 'light' ? 'shadow-2xl shadow-gray-400 border border-gray-300' : 'border border-gray-400'}`}>
                <CoinHoldingComponent coin={selectedCoin} data={selectedCoin === 'bitcoin' ? data.btc : data.eth} setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} loading={loading} />
            </div>
        </>
    )
}

export default HoldingComponent