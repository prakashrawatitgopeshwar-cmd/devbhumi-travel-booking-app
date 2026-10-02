import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "DevBhoomi Himalayan Horizon | Explore Uttarakhand",
  description: "Plan trips across Uttarakhand with destinations, stays, cabs, experiences and a smart trip planner.",
  metadataBase: new URL("https://devbhoomihimalayanhorizon.in")
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>;
}
