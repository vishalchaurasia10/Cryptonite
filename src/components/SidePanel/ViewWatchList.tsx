'use client';
import useWatchlistStore from "@/store/Watchlist";
import { useEffect, useState } from "react";
import { FaDropbox } from "react-icons/fa";
import WatchListSideMenu from "./WatchListSideMenu";


const ViewWatchList = () => {
    const { activeCoin, setActiveCoin, addCoin, coinId } = useWatchlistStore((state) => state);
    const [inRegion, setInRegion] = useState(false);

    useEffect(() => {
        console.log("list of coins", coinId);
    }, [coinId]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (activeCoin) {
            addCoin(activeCoin);
            setActiveCoin(null);
            setInRegion(false);
        }
    }

    return (
        <div
            className='side-panel h-1/2 border border-gray-300 rounded-lg p-4 shadow-2xl shadow-gray-400'>
            {
                activeCoin ?
                    <div
                        onDragEnter={() => setInRegion(true)}
                        onDragLeave={() => setInRegion(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="w-full h-full">
                        <FaDropbox className={`${inRegion ? 'text-blue-500' : 'text-gray-400'} transition-all duration-300 h-full w-full`} />
                    </div>
                    :
                    <WatchListSideMenu />
            }
        </div>
    );
};

export default ViewWatchList;
