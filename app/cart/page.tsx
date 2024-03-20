"use client";
import React, { useEffect, useState } from 'react'
import CartItem from '@/components/CartItem';
import supabase from '../supabaseClient';
import { useUser } from '../utils/useUser';
import HeroCustom from '../../components/HeroCustom';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const user = useUser();
    const [cart, setCart] = useState<any>([])
    const [total, setTotal] = useState<number>()
    const router = useRouter()

    const handleCart = async () => {
        const user = JSON.parse(localStorage.getItem("sb-iovmeejceocblildcubg-auth-token") || "{}").user;
        const { data, error } = await supabase.from("cart").select("*").eq("user_id", user.id)

        if (error) {
            console.log(error);
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

        setTotal(totalPrice)
    }

    const handleCheckout = async () => {
        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify([cart, user]),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const session = await res.json();

        window.location = session.url;
    }

    useEffect(() => {
        handleCart()
    }, [])

    return (
        <>
            <HeroCustom title='Shooping Cart' desc='' />
            <div className="min-h-screen bg-gray-100 pt-20">
                <div className="rounded-lg">
                    {cart.length == 0 ? (
                        <>
                            <div className='h-screen flex items-center justify-center'>
                                <div className="max-w-4xl mx-auto px-10 py-4">
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-24 w-24 text-gray-400 mb-4">
                                            <path
                                                d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
                                            </path>
                                        </svg>
                                        <p className="text-gray-600 text-lg font-semibold mb-4">Your shopping cart is empty.</p>
                                        <button
                                            onClick={() => { router.push("/products") }}
                                            className="px-6 py-2 font-bold bg-black text-white rounded-md shadow-md hover:bg-white hover:text-black transition-colors duration-300">
                                            Let&apos;s go shopping!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                        : (
                            <>
                                <div className="mx-auto max-w-2xl justify-center px-6 ">
                                    <div className='overflow-y-scroll'>
                                        {cart.map((c: any) => (
                                            <div key={c.id}>
                                                <CartItem productID={c.product_id} />
                                            </div>))
                                        }
                                    </div>
                                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                        <div className="flex justify-between">
                                            <p className="text-lg font-normal uppercase">Total</p>
                                            <div className="">
                                                <p className="mb-1 text-lg font-bold">{total}€</p>
                                            </div>
                                        </div>

                                        <button className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-white transition ease-in-out delay-75 hover:bg-white hover:text-black flex flex-row items-center justify-center gap-2" onClick={handleCheckout}>
                                            Check Out
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </>
    )
}
