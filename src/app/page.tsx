import HomeGraphComponent from "@/components/Home/HomeGraphComponent";
import TrendingMarket from "@/components/Home/TrendingMarket";

export default function Home() {
  return (
    <div className=" flex flex-col space-y-4 justify-center items-center">
      <HomeGraphComponent />
      <TrendingMarket />
    </div>
  );
}
