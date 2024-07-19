import HomeGraphComponent from "@/components/Home/HomeGraphComponent";
import TrendingMarket from "@/components/Home/TrendingMarket";

export default function Home() {
  return (
    <div className="w-full p-3 lg:flex lg:flex-col space-y-6 justify-center items-center">
      <HomeGraphComponent />
      <TrendingMarket />
    </div>
  );
}
