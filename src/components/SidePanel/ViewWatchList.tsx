'use client';
import useWatchlistStore from "@/store/Watchlist";
import { useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import WatchListSideMenu from "./WatchListSideMenu";
import toast, { Toaster } from "react-hot-toast";
import useThemeStore from "@/store/Theme";


const ViewWatchList = () => {
    const { activeCoin, setActiveCoin, addCoin, coinId, loadCoinsFromLocalStorage } = useWatchlistStore((state) => state);
    const { theme } = useThemeStore((state) => state);

    useEffect(() => {
        loadCoinsFromLocalStorage((message: string) => {
            toast.error(message);
        });
    }, []);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (activeCoin) {
            addCoin(activeCoin, (message: string) => toast.success(message), (message: string) => toast.error(message));
            setActiveCoin(null);
        }
    }

    return (
        <div className={`side-panel h-1/2 overflow-y-auto rounded-lg p-4 ${theme == 'light' ? 'shadow-2xl shadow-gray-400 border border-gray-300' : 'border border-gray-400'}`}>
            <Toaster />
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
