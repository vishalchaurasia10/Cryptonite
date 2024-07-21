import HoldingComponent from "./home/HoldingComponent";
import HomeGraphComponent from "./home/HomeGraphComponent";

export default function Home() {
  return (
    <div className="w-full p-3 lg:flex lg:flex-col space-y-10 justify-center items-center">
      <HomeGraphComponent />
      <HoldingComponent />
    </div>
  );
}
