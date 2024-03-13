"use client";
import React, { useEffect, useState } from 'react'
import CartItem from '@/components/CartItem';
import supabase from '../supabaseClient';
import { useUser } from '../utils/useUser';

export default function Cart() {
    const user = useUser()
    const [cart, setCart] = useState<any>([])

    const handleCart = async () => {
        const { data, error } = await supabase.from("cart").select("*").eq("user_id", user?.id)
        
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setCart(data)
        }
    }

    useEffect(() => {
        handleCart()
    }, [])

    return (
        <>
            <div className="h-screen bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {/* {cart.map((c: any) => (
                            ))} */}
                            <CartItem key={1} productID={1}/>
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">0€</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">0€</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>
                </div>
            </div>
        </>
    )
}
