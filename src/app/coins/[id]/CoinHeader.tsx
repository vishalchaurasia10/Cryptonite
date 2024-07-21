import React from 'react'
import { CoinData } from './CoinData'
import Image from 'next/image'
import { checkForNull } from './CoinInfo'
import { BsArrowDown, BsArrowUp, BsFilePlus } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import useWatchlistStore from '@/store/Watchlist'

const CoinHeader = ({ coin }: { coin: CoinData | null }) => {

    const { addCoin } = useWatchlistStore((state) => state)

    return (
        <div className='header font-poppins space-y-2 mb-2'>
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
                <div onClick={() => coin?.id ? addCoin(coin?.id) : ''} title='Add to Watchlist' className="add cursor-pointer">
                    <AiOutlinePlusCircle className='text-green-500 text-3xl' />
                </div>
            </div>
        </div>
    )
}

export default CoinHeader
