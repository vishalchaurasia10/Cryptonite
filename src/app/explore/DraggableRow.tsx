import { formatYAxis } from '@/components/Home/HomeGraphComponent';
import { ExploreData } from '@/store/Explore';
import Image from 'next/image';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const DraggableRow = ({ coin, index, onDragEnd }: { coin: ExploreData, index: number, onDragEnd: (event: any, info: any, coinId: string) => void }) => {
    const arr = ['price_change_24h', 'price_change_7d', 'price_change_30d', 'price_change_1y'];

    const getPriceChangeDirection = (value: number) => {
        if (value > 0) return <BsArrowUp className='text-green-500' />;
        if (value < 0) return <BsArrowDown className='text-red-500' />;
        return null;
    };

    const formatPriceChange = (value: number | null | undefined) => {
        if (value === null || value === undefined) return '-------';
        return `${Math.abs(parseFloat(value.toFixed(1)))}%`;
    };

    return (
        <tr
            key={index}
            className="draggable-row"
        >
            <td className='flex space-x-2 items-center'>
                <Image className='h-4 w-4 rounded-full' src={coin.image} width={100} height={100} alt={coin.name} />
                <span>{coin.name}</span>
            </td>
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
    );
};

export default DraggableRow;