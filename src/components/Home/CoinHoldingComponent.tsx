import { CoinHolding } from '@/store/Holding'
import React, { useEffect, useState } from 'react'
import { formatYAxis } from './HomeGraphComponent'

const CoinHoldingComponent = ({ coin, data, setSelectedCoin, selectedCoin }: {
    coin: 'bitcoin' | 'ethereum', data: CoinHolding[], setSelectedCoin: React.Dispatch<React.SetStateAction<'bitcoin' | 'ethereum'>>, selectedCoin: 'bitcoin' | 'ethereum'
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCoin(event.target.value as 'bitcoin' | 'ethereum')
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='font-poppins py-5 px-3 lg:p-6'>
            <div className='flex justify-between items-center px-2 pb-5'>
                <p className=' font-bold text-lg lg:text-2xl capitalize'>{coin} Holding</p>
                <div className='flex justify-center'>
                    <select value={selectedCoin} onChange={handleCoinChange} className='select focus:outline-none  select-bordered w-full max-w-xs'>
                        <option value='bitcoin'>Bitcoin</option>
                        <option value='ethereum'>Ethereum</option>
                    </select>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className="table table-md">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Country</th>
                            <th>Total Holdings</th>
                            <th>Current Value</th>
                            <th>Total Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((company, index) => (
                            <tr key={index}>
                                <td>{company.name}</td>
                                <td>{company.symbol}</td>
                                <td>{company.country}</td>
                                <td>${formatYAxis(company.total_holdings)}</td>
                                <td>${formatYAxis(company.total_current_value_usd)}</td>
                                <td>{company.percentage_of_total_supply.toFixed(3)}%</td>
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
                        Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                        className="join-item btn bg-transparent border-gray-300">»</button>
                </div>
            </div>
        </div>
    )
}

export default CoinHoldingComponent