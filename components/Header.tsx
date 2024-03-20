"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import supabase from "@/app/supabaseClient";
import { useRouter } from "next/navigation";
import SmallCartItem from "./SmallCartItem";
import { storageURL } from "@/app/utils";
import { useUser } from "@/app/utils/useUser";

export default function Header() {
  const router = useRouter()
  const user = useUser();
  const [cart, setCart] = useState<any>([])
  const [totalPrice, setTotalPrice] = useState(0);

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

    setTotalPrice(totalPrice)
  }

  useEffect(() => {
    handleCart()
  }, [])

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
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
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content overflow-x-auto">
                  <p className="text-xl font-extrabold mb-2">Cart</p>
                  <hr />
                  <div className="my-5">
                    {totalPrice != 0 ? (
                      cart.map((c: any) => (
                        <SmallCartItem key={c.id} productID={c.product_id} />
                      ))
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-10 w-10 text-gray-400 mb-4">
                          <path
                            d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
                          </path>
                        </svg>
                          <p className="text-gray-600 text-lg font-semibold mb-4">Your shopping cart is empty.</p>
                      </div>
                    )}
                  </div>
                  <hr />
                  <span className="text-sm font-extrabold my-5 items-center">Subtotal: {totalPrice} €</span>
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
