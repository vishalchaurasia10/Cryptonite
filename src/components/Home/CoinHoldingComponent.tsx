import { CoinHolding } from '@/store/Holding'
import React from 'react'
import { formatYAxis } from './HomeGraphComponent'

const CoinHoldingComponent = ({ coin, data }: { coin: 'bitcoin' | 'ethereum', data: CoinHolding[] }) => {
    return (
        <div className='font-poppins w-full border border-gray-300 rounded-lg py-5 px-3 lg:p-6'>
            <div className='flex justify-between items-center px-2 pb-5'>
                <p className=' font-bold text-lg lg:text-2xl capitalize'>{coin} Holding</p>
            </div>
            <div className=' overflow-x-auto'>
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
                        {data.map((company, index) => (
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
        </div>
    )
}

export default CoinHoldingComponent
