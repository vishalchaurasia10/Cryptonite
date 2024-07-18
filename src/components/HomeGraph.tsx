'use client'
import useHomeGraphStore from '@/store/HomeGraph'
import React, { useEffect } from 'react'

const HomeGraph = () => {

    const { data, fetchData } = useHomeGraphStore((state) => state)

    useEffect(() => {
        if (data.btc.prices.length === 0) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div>

        </div>
    )
}

export default HomeGraph