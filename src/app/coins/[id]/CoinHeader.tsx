import React from 'react'
import { CoinData } from './CoinData'
import Image from 'next/image'
import { checkForNull } from './CoinInfo'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import useWatchlistStore from '@/store/Watchlist'
import { AnimatePresence, motion } from 'framer-motion'
import HeaderLoading from '@/components/loading/HeaderLoading'
import toast from 'react-hot-toast'

const CoinHeader = ({ coin, loading }: { coin: CoinData | null, loading: boolean }) => {

    const { addCoin } = useWatchlistStore((state) => state)

    return (
        <div className='header font-poppins w-full'>
            {loading && <HeaderLoading loading={loading} />}
            <AnimatePresence>
                {!loading &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className='header font-poppins space-y-2 w-full mb-5'
                    >

                        <Image className='h-8 w-8 border rounded-lg p-1' src={coin?.image?.thumb ?? ''} alt='coinImage' width='100' height='100' />
                        <h1 className='text-gray-500 '>{coin?.name}</h1>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <p className='text-3xl font-bold'>${checkForNull(coin?.market_data.current_price.usd ?? null)}</p>
                                <p className={`${coin?.market_data.price_change_percentage_24h !== undefined && coin?.market_data.price_change_percentage_24h < 0 ? 'bg-red-300 text-red-700' : 'bg-green-300 text-green-700'} flex items-center rounded-md px-2 p-1 text-xs`}>
                                    {coin?.market_data.price_change_percentage_24h !== undefined && coin?.market_data.price_change_percentage_24h < 0 ?
                                        <BsArrowDown />
                                        :
                                        <BsArrowUp />
                                    }
                                    <span>
                                        {coin?.market_data.price_change_percentage_24h}%
                                    </span>
                                </p>
                            </div>
                            <div
                                onClick={() => coin?.id ? addCoin(coin?.id, (message: string) => toast.success(message), (message: string) => toast.error(message)) : ''}
                                title='Add to Watchlist' className="add cursor-pointer">
                                <AiOutlinePlusCircle className='text-green-500 text-3xl cursor-pointer' />
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default CoinHeader
