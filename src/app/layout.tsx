import type { Metadata } from "next";

import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust",
  description: "Explore beautiful destinations with Wanderlust.",
   icons: {
    icon: "/wanderlust.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${josefinSans.className} h-full antialiased`}>
   
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>
          {children}
          <ToastContainer />
        </main>
        <Footer />
      </body>
    </html>
  );
}
