'use client'
import React, { useEffect } from 'react'
import { CoinData } from './CoinData'
import TableLoading from '@/components/loading/TableLoading'
import { AnimatePresence, motion } from 'framer-motion'
import useThemeStore from '@/store/Theme'

export const checkForNull = (value: string | number | null) => {
    if (value === null) {
        return 'N/A'
    }
    // If the value is a string, convert it to a number first
    const num = typeof value === 'string' ? parseFloat(value) : value
    // Check if the conversion resulted in a valid number
    if (isNaN(num)) {
        return 'N/A'
    }
    // Return the number formatted with two decimal places and localized string
    return num.toFixed(2).toLocaleString()
}

const CoinInfo = ({ coin, loading }: { coin: CoinData | null, loading: boolean }) => {

    const { theme } = useThemeStore((state) => state)

    useEffect(() => {
        console.log(coin)
    }, [coin])

    return (
        <div className={`font-poppins w-full rounded-lg py-5 px-3 lg:p-6 min-h-screen p-2 space-y-4  ${theme == 'light' ? 'shadow-2xl shadow-gray-400 border border-gray-300' : 'border border-gray-400'}`}>
            <TableLoading loading={loading} />
            <AnimatePresence>
                {!loading && coin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        <div className='performances'>
                            <h2 className='font-bold text-xl lg:text-3xl pb-4'>Performances</h2>
                            <div className='flex items-center justify-center text-sm lg:text-base'>
                                <p className='flex flex-col w-1/5 lg:w-[15%]'>
                                    <span>Today&apos;s Low</span>
                                    <span className='font-bold'>${checkForNull((coin.market_data.low_24h.usd).toFixed(3))}</span>
                                </p>
                                <div className="tooltip tooltip-open w-[70%]" data-tip={`$${coin.market_data.current_price.usd}`}>
                                    <div className="line bg-green-600 h-2 w-full rounded-full"></div>
                                </div>
                                <p className='flex flex-col items-end w-1/5 lg:w-[15%]'>
                                    <span className='text-right'>Today&apos;s High</span>
                                    <span className='font-bold'>${checkForNull((coin.market_data.high_24h.usd).toFixed(3))}</span>
                                </p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="fundamentals w-full lg:w-1/2 text-sm lg:text-base">
                            <h2 className='font-bold text-xl lg:text-3xl pb-4'>Fundamentals</h2>
                            <div className='w-full flex items-center justify-between'>
                                <span className='text-gray-500'>Marketcap: </span>
                                <span className='font-bold'>${checkForNull(coin.market_data.market_cap.usd)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className='w-full flex items-center justify-between'>
                                <span className='text-gray-500'>Fully Diluted Valuation: </span>
                                <span className='font-bold'>${checkForNull(coin.market_data.fully_diluted_valuation.usd)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className='w-full flex items-center justify-between'>
                                <span className='text-gray-500'>24 Hour Trading Vol: </span>
                                <span className='font-bold'>${checkForNull(coin.market_data.total_volume.usd)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className='w-full flex items-center justify-between'>
                                <span className='text-gray-500'>Circulating Supply: </span>
                                <span className='font-bold'>{checkForNull(coin.market_data.circulating_supply)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className='w-full flex items-center justify-between'>
                                <span className='text-gray-500'>Total Supply: </span>
                                <span className='font-bold'>{checkForNull(coin.market_data.total_supply)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className='w-full flex items-center justify-between'>
                                <span className='text-gray-500'>Max Supply: </span>
                                <span className='font-bold'>{checkForNull(coin.market_data.max_supply)}</span>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="description">
                            <h2 className='font-bold text-xl lg:text-3xl pb-4'>About {coin.name}</h2>
                            <p className='text-justify text-sm lg:text-base' dangerouslySetInnerHTML={{ __html: coin.description.en }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CoinInfo