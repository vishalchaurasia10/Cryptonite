'use client'
import useHomeGraphStore from '@/store/HomeGraph'
import React, { useEffect } from 'react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import GraphLoading from '../loading/GraphLoading';

export const formatYAxis = (tick: number) => {
    if (tick >= 1_000_000_000_000) {
        return `${(tick / 1_000_000_000_000).toFixed(0)}T`;
    }
    if (tick >= 1_000_000_000) {
        return `${(tick / 1_000_000_000).toFixed(0)}B`;
    }
    if (tick >= 1_000_000) {
        return `${(tick / 1_000_000).toFixed(0)}M`;
    }
    if (tick >= 1_000) {
        return `${(tick / 1_000).toFixed(0)}k`;
    }
    return tick;
};

const HomeGraph = () => {

    const { data, fetchData, loading } = useHomeGraphStore((state) => state)

    useEffect(() => {
        if (data.btc.prices.length === 0) {
            fetchData()
        }
    }, [])

    // Transform the data into a suitable format for Recharts
    const transformData = () => {
        const transformed = []
        const btcPrices = data.btc.market_caps
        const ethPrices = data.eth.market_caps
        const ltcPrices = data.ltc.market_caps

        for (let i = 0; i < btcPrices.length; i++) {
            transformed.push({
                time: new Date(btcPrices[i][0]).toLocaleDateString(),
                btc: btcPrices[i][1],
                eth: ethPrices[i] ? ethPrices[i][1] : null,
                ltc: ltcPrices[i] ? ltcPrices[i][1] : null
            })
        }
        return transformed
    }

    const chartData = transformData()

    return (
        <div className='w-full flex justify-center items-center py-5 pt-8 lg:pt-10 lg:py-10 pr-5 lg:pr-10 border border-gray-300 rounded-lg shadow-2xl shadow-gray-400 relative'>
            <GraphLoading loading={loading} />
            <ResponsiveContainer className={`${loading ? 'opacity-0' : 'opacity-100'} transition-all duration-300 w-full`} width="100%" height={400}>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 0, right: 0, left: 0, bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ea64b7" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#64bddc" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorLtc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e79986" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis minTickGap={10} fontSize={13} dataKey="time" />
                    <YAxis tickFormatter={(value: any, index: number) => String(formatYAxis(value))} fontSize={13} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={
                        (value: any, name: any, props: any) => {
                            value = '₹' + value.toLocaleString();
                            return [value, name];
                        }
                    } />
                    <Legend iconSize={8} iconType='circle' verticalAlign='top' align='left' />
                    <Area type="monotone" dataKey="btc" stroke="#ea64b7" fillOpacity={1} fill="url(#colorBtc)" />
                    <Area type="monotone" dataKey="eth" stroke="#64bddc" fillOpacity={1} fill="url(#colorEth)" />
                    <Area type="monotone" dataKey="ltc" stroke="#e79986" fillOpacity={1} fill="url(#colorLtc)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default HomeGraph