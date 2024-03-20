"use client";
import React, { useEffect, useState } from 'react'
import CartItem from '@/components/CartItem';
import supabase from '../supabaseClient';
import { useUser } from '../utils/useUser';

export default function Cart() {
    const user = useUser();
    const [cart, setCart] = useState<any>([])
    const [total, setTotal] = useState<number>()

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
            <div className="h-auto bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-2xl justify-center px-6">
                    <div className="rounded-lg">
                        {cart.length == 0 ? (
                            <>
                                <p>There is nothing in your cart, yet</p>
                            </>
                        )
                            : (
                                <>
                                    {cart.map((c: any) => (
                                        <div key={c.id} className='overflow-scroll'>
                                            <CartItem productID={c.product_id} />
                                        </div>))
                                    }
                                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                        <div className="flex justify-between">
                                            <p className="text-lg font-bold">Total</p>
                                            <div className="">
                                                <p className="mb-1 text-lg font-bold">{total}€</p>
                                            </div>
                                        </div>
                                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleCheckout}>Check out</button>
                                    </div>
                                </>
                            )}
                    </div>

                </div>
            </div>
        </>
    )
}
