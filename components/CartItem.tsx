"use client";

import supabase from '@/app/supabaseClient';
import { storageProductURL } from '@/app/utils';
import React, { useEffect, useState } from 'react'

type Product = {
    id: number
    name: string
    price: number
    description: string
    brand: string
    photo_url: string
}

export default function CartItem({ productID }: { productID: number }) {
    const [product, setProduct] = useState<Product>()
    const [quantity, setQuantity] = useState<number>(1);

    const getProduct = async () => {
        const { data, error } = await supabase.from("products").select("*").eq("id", productID)

        if (error) {
            console.log(error.message);
        } else {
            setProduct(data[0])
        }
    }

    const handleDeleteCart = async () => {
        const user = JSON.parse(localStorage.getItem("sb-iovmeejceocblildcubg-auth-token") || "{}").user;
        const { error } = await supabase.from("cart").delete().eq("user_id", user.id)
        if (error) {
            console.log(error.message);
        } else {
            window.location.reload();
        }
    }

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={`${storageProductURL}/${product?.photo_url}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="ml-4 flex w-full justify-between">
                    <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{product?.name}</h2>
                        <p className="text-sm">{product?.price} €</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center">
                            <button className="btn btn-xs" onClick={decrementQuantity}>-</button>
                            <span className="mx-2">{quantity}</span>
                            <button className="btn btn-xs" onClick={incrementQuantity}>+</button>
                        </div>
                        <div className="flex items-center" onClick={handleDeleteCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
