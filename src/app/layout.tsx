import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SidePanelComponent from "@/components/SidePanel/SidePanelComponent";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`lg:pl-20`}>
        <Navbar />
        <div className="flex lg:space-x-4 pb-20 lg:pb-0 lg:py-5">
          <div className="w-full lg:w-[65%] flex items-center justify-center">
            {children}
          </div>
          <div className="fixed top-8 right-0 lg:w-[35%] h-full flex items-center justify-center">
            <SidePanelComponent />
          </div>
        </div>
      </body>
    </html>
  );
}
