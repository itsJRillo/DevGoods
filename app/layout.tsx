import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import Toast from "../components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevGoods",
  description: "An e-commerce for developers",
  icons: {
    icon: '/icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: { user } } = await supabase.auth.getUser()
  
  // if (user == true) {
  //   const { error } = await supabase
  //     .from('users')
  //     .update({ username: user, email: user?.email })
  //     .eq('id', user?.id)

  //   if(error){
  //     toast(error.message)
  //   } else {
  //     toast("Logged In")
  //   }
  // }

  return (
    <html lang="en" data-theme="lofi">
      <body className={inter.className}>
        <Header />
        
        {children}
        
        <Footer />
      </body>
    </html>
  );
}