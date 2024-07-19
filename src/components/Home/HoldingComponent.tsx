'use client'
import useHoldingStore from '@/store/Holding'
import React, { useEffect } from 'react'
import CoinHoldingComponent from './CoinHoldingComponent'

const HoldingComponent = () => {

    const { data, fetchData } = useHoldingStore((state) => state)

    useEffect(() => {
        if (data.btc.length === 0 || data.eth.length === 0) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className='space-y-5'>
            <CoinHoldingComponent coin='bitcoin' data={data.btc} />
            <CoinHoldingComponent coin='ethereum' data={data.eth} />
        </div>
    )
}

export default HoldingComponent
