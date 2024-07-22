'use client'
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import useSearchStore from '@/store/Search';
import useThemeStore from '@/store/Theme';

const RecentlyViewed = () => {

    const { suggestions } = useSearchStore((state) => state);
    const { theme } = useThemeStore((state) => state);

    return (
        <div className={`side-panel h-1/3 mt-10 overflow-y-auto rounded-lg p-4 ${theme == 'light' ? 'shadow-2xl shadow-gray-400 border border-gray-300' : 'border border-gray-400'}`}>
            <div className='overflow-x-auto font-poppins'>
                <div className='flex justify-between items-center px-2 pb-5'>
                    <p className='sticky font-bold text-lg lg:text-2xl'>Recently Viewed</p>
                </div>
                <table className="table table-md">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            {/* <th>ID</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {suggestions.map((coin, index) => (
                            <tr key={index}>
                                <Link href={`/coins/${coin.id}`}>
                                    <td className='flex space-x-2 items-center'>
                                        <Image className='h-4 w-4 rounded-full' src={coin.thumb} width={100} height={100} alt={coin.name} />
                                        <span>{coin.name}</span>
                                    </td>
                                </Link>
                                <td>{coin.symbol}</td>
                                {/* <td>{coin.id}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default RecentlyViewed