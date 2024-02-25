import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevGoods",
  description: "An e-commerce for developers",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" data-theme="lofi">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}