'use client';
import useExploreStore from '@/store/Explore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { formatYAxis } from '../home/HomeGraphComponent';
import useWatchlistStore from '@/store/Watchlist';
import TableLoading from '@/components/loading/TableLoading';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import useThemeStore from '@/store/Theme';


const ExploreComponent = () => {
    const { data, fetchData, loading } = useExploreStore((state) => state);
    const { activeCoin, setActiveCoin } = useWatchlistStore((state) => state);
    const { theme } = useThemeStore((state) => state);
    const arr = ['price_change_24h', 'price_change_7d', 'price_change_30d', 'price_change_1y'];
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (data.length === 0) {
            fetchData(1, (message: string) => {
                toast.error(message);
            });
        }
    }, []);

    useEffect(() => {
        fetchData(currentPage, (message: string) => {
            toast.error(message);
        });
    }, [currentPage]);

    const getPriceChangeDirection = (value: number) => {
        if (value > 0) return <BsArrowUp className='text-green-500' />;
        if (value < 0) return <BsArrowDown className='text-red-500' />;
        return null;
    };

    const formatPriceChange = (value: number | null | undefined) => {
        if (value === null || value === undefined) return '-------';
        return `${Math.abs(parseFloat(value.toFixed(1)))}%`;
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className={`font-poppins w-full rounded-lg py-5 px-3 lg:p-6 min-h-screen  ${theme == 'light' ? 'shadow-2xl shadow-gray-400 border border-gray-300' : 'border border-gray-400'}`}>
            <Toaster />
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
                            <p className=' font-bold text-lg lg:text-2xl'>Explore All Coins</p>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className="table table-md">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Marketcap</th>
                                        <th>Volume</th>
                                        <th>Price</th>
                                        {/* <th>1H</th> */}
                                        <th>24H</th>
                                        <th>7D</th>
                                        <th>30D</th>
                                        <th>1Y</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((coin, index) => (
                                        <tr key={index}>
                                            <Link href={`/coins/${coin.id}`} passHref>
                                                <td
                                                    onDragStart={() => setActiveCoin(coin.id)}
                                                    onDragEnd={() => setActiveCoin(null)}
                                                    draggable
                                                    className='flex space-x-2 items-center hover:underline cursor-grab'>
                                                    <Image className='h-4 w-4 rounded-full' src={coin.image} width={100} height={100} alt={coin.name} />
                                                    <span>{coin.name}</span>
                                                </td>
                                            </Link>
                                            <td>${formatYAxis(coin.market_cap)}</td>
                                            <td>${formatYAxis(coin.total_volume)}</td>
                                            <td>${coin.current_price.toFixed(2)}</td>
                                            {arr.map((key) => (
                                                <td key={key}>
                                                    <p className={`flex items-center ${Number(coin[key as keyof typeof coin]) > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                                                        {coin[key as keyof typeof coin] !== null && coin[key as keyof typeof coin] !== undefined
                                                            ? (
                                                                <>
                                                                    {getPriceChangeDirection(Number(coin[key as keyof typeof coin]))}
                                                                    {formatPriceChange(Number(coin[key as keyof typeof coin]))}
                                                                </>
                                                            )
                                                            : '-------'
                                                        }
                                                    </p>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-center items-center pt-4'>
                            <div className="join">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="join-item btn bg-transparent border-gray-300">«</button>
                                <button className="join-item btn bg-transparent border-gray-300">
                                    Page {currentPage}
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className="join-item btn bg-transparent border-gray-300">»</button>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default ExploreComponent;
