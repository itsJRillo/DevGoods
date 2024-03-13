"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import supabase from "@/app/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import SmallCartItem from "./SmallCartItem";
import { storageURL } from "@/app/utils";

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const [cart, setCart] = useState<any>([])
  const [items, setItems] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("sb-iovmeejceocblildcubg-auth-token") || "{}").user)
  }, [])

  const handleCart = async () => {
    const { data, error } = await supabase.from("cart").select("*").eq("user_id", user?.id)
    if (error) {
      console.log(error)
    } else {
      setCart(data)
      calculateTotalPrice(data)
    }
  }

  const calculateTotalPrice = async (cart: any) => {
    let totalPrice = 0;

    for (const item of cart) {
      const { data, error } = await supabase
        .from("products")
        .select('price')
        .eq('id', item.product_id)
        .single();

      if (error) {
        console.error('Error fetching product details:', error.message);
        return;
      }

      if (data) {
        totalPrice += data.price * item.quantity;
      }
    }

    setItems(totalPrice)
  }

  useEffect(() => {
    handleCart()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.setItem("hasReloaded", "false")
      router.push("/")
      window.location.reload()
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/products">Shop</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-center">
          <Link href="/" className="text-xl text-zinc-950 font-semibold btn btn-ghost">
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="inline-block fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            DevGoods
          </Link>
        </div>

        <div className="navbar-end gap-3">
          {/* Avatar */}
          {user?.id != null ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={`${user?.id != null ? `${storageURL}/${user.user_metadata.avatar_url}` : `${storageURL}/profile-avatar.png`}`} alt="avatar" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">

                  <div className="flex flex-col p-2">
                    <p className="font-bold">{user.user_metadata.username}</p>
                    <p>{user.email}</p>
                  </div>

                  <hr />
                  <li><Link href="/account">Account</Link></li>
                  <hr />
                  <li><button onClick={() => { handleSignOut() }}>Log out</button></li>
                </ul>

              </div>
            </>
          ) : (
            <Link href="/account/login" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                  clipRule="evenodd"
                />
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M5.5 19a13.282 13.282 0 0 1 14 0"
                />
              </svg>
            </Link>)}

          {/* Shopping Cart */}
          <div>
            <div className="drawer drawer-end z-auto">
              <input id="my-drawer-4" type="checkbox" onClick={handleCart} className="drawer-toggle" />

              <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      /></svg>
                    <span className="badge badge-sm indicator-item rounded-full">{cart.length}</span>
                  </div>
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  <p className="text-xl font-extrabold mb-2">Cart</p>
                  <hr />
                  <div className="my-5">
                    {items != 0 ? (
                      cart.map((c: any) => (
                        <SmallCartItem key={c.id} productID={c.product_id} />
                      ))
                    ) : (
                      <div className="text-sm font-bold">
                        <p>There is nothing in the cart yet.</p>
                      </div>
                    )}
                  </div>
                  <hr />
                  <span className="text-sm font-extrabold my-5 items-center">Subtotal: {items} €</span>
                  <hr />
                  <button type="button" className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded" onClick={() => {
                    router.push("/cart")
                  }}>Go to cart</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
