'use client'
import { formatYAxis } from '@/components/Home/HomeGraphComponent';
import GraphLoading from '@/components/loading/GraphLoading';
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

interface CoinGraphData {
    time: string;
    price: number;
}

const CoinGraph = ({ id }: { id: string }) => {

    const [data, setData] = useState<CoinGraphData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!,
                },
            };
            try {
                setLoading(true);
                const response = await fetch(apiUrl, options);
                if (!response.ok) {
                    toast.error(`HTTP error! status: ${response.status}`);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const resData = await response.json();
                const transformedData = transformData(resData.prices);
                setData(transformedData);
            } catch (error) {
                toast.error('Error fetching graph data');
                console.error('Error fetching graph data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const transformData = (prices: [number, number][]): CoinGraphData[] => {
        return prices.map(([timestamp, price]) => ({
            time: new Date(timestamp).toLocaleDateString(), // Changed to date string for better chart labels
            price,
        }));
    };

    return (
        <>
            <Toaster />
            <div className='w-full flex justify-center items-center py-5 pt-8 lg:pt-10 lg:py-10 pr-5 lg:pr-10 border border-gray-300 rounded-lg shadow-2xl shadow-gray-400 mb-10 relative'>
                <GraphLoading loading={loading} />
                <ResponsiveContainer className='w-full' width="100%" height={400}>
                    <AreaChart
                        data={data} // Use transformed data here
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ea64b7" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
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
                        <Area type="monotone" dataKey="price" stroke="#ea64b7" fillOpacity={1} fill="url(#colorBtc)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default CoinGraph