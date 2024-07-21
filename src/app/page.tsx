import HoldingComponent from "./home/HoldingComponent";
import HomeGraphComponent from "./home/HomeGraphComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Cryptonite",
  description: "Welcome to Cryptonite, the best place to track your crypto holdings and explore new coins.",
};

export default function Home() {
  return (
    <div className="w-full p-3 lg:flex lg:flex-col space-y-10 justify-center items-center">
      <HomeGraphComponent />
      <HoldingComponent />
    </div>
  );
}
