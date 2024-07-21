'use client'
import TableLoading from '@/components/loading/TableLoading'
import useTrendingStore from '@/store/Trending'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa'

const TrendingMarket = () => {

    const { data, fetchData, loading } = useTrendingStore((state) => state)

    useEffect(() => {
        if (data.length === 0) {
            fetchData()
        }
    }, [])

    return (
        <div className='font-poppins w-full border border-gray-300 rounded-lg py-5 px-3 lg:p-6 min-h-screen shadow-2xl shadow-gray-400'>
            <TableLoading loading={loading} />
            <AnimatePresence>
                {!loading &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        <div className='flex justify-between items-center px-2 pb-5'>
                            <p className=' font-bold text-lg lg:text-2xl'>Trending Market</p>
                            <Link href='/explore'>
                                <p className='flex group hover:bg-slate-200 p-2 lg:px-4 rounded-full items-center lg:space-x-1 text-slate-500 font-poppins transition-all duration-300'>
                                    <span className='font-bold whitespace-nowrap'>View more coins</span>
                                    <FaChevronRight className='group-hover:translate-x-0.5 transition-all duration-300' />
                                </p>
                            </Link>
                        </div>
                        <div className=' overflow-x-auto'>
                            <table className="table table-md">
                                <thead>
                                    <tr>
                                        <th>Token</th>
                                        <th>Symbol</th>
                                        <th>Last Price</th>
                                        <th>24H Change</th>
                                        <th>Market Cap</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((coin, index) => (
                                        <tr key={index}>
                                            <Link href={`/coins/${coin.id}`} passHref>
                                                <td className='flex space-x-2 items-center'>
                                                    <Image className='h-4 w-4 rounded-full' src={coin.thumb} width={100} height={100} alt={coin.name} />
                                                    <span>{coin.name}</span>
                                                </td>
                                            </Link>
                                            <td>{coin.symbol}</td>
                                            <td>${coin.price.toFixed(2)}</td>
                                            <td className={`${coin.change < 0 ? 'text-red-500' : 'text-green-500'} flex items-center font-medium`}>
                                                {
                                                    coin.change < 0 ? <BsArrowDown className='text-red-500' /> : <BsArrowUp className='text-green-500' />
                                                }
                                                <span>
                                                    {Math.abs(parseFloat(coin.change.toFixed(2)))}%
                                                </span>
                                            </td>
                                            <td>{coin.market_cap}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default TrendingMarket
