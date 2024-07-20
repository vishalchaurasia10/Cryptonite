'use client';
import useWatchlistStore from "@/store/Watchlist";
import { useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import WatchListSideMenu from "./WatchListSideMenu";


const ViewWatchList = () => {
    const { activeCoin, setActiveCoin, addCoin, coinId, loadCoinsFromLocalStorage } = useWatchlistStore((state) => state);

    useEffect(() => {
        console.log("list of coins", coinId);
    }, [coinId]);

    useEffect(() => {
        loadCoinsFromLocalStorage();
    }, []);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (activeCoin) {
            addCoin(activeCoin);
            setActiveCoin(null);
        }
    }

    return (
        <div
            className='side-panel h-1/2 border border-gray-300 rounded-lg p-4 shadow-2xl shadow-gray-400'>
            {
                activeCoin ?
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="w-full h-full">
                        <FaBitcoin className={` text-orange-300 transition-all duration-300 h-full w-full`} />
                    </div>
                    :
                    <WatchListSideMenu />
            }
        </div>
    );
};

export default ViewWatchList;
