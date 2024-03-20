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

export default function SmallCartItem({ productID }: { productID: number }) {
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

    const handleDeleteFromCart = async () => {
        const { error } = await supabase.from("cart").delete().eq("product_id", productID)
        if (error) {
            console.log(error.message);
        }
        window.location.reload()
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
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md flex flex-col justify-center items-center">
                <img src={`${storageProductURL}/${product?.photo_url}`} alt="product-image" className="w-full rounded-lg" />
                <div className="ml-4 flex w-full justify-between gap-2 p-2">
                    <div className="mt-5 sm:mt-0 gap-1">
                        <h2 className="text-lg font-bold text-gray-900">{product?.name}</h2>
                        <p className="text-base">{product?.price} €</p>
                        <div className="flex items-center">
                            <button className="btn btn-xs" onClick={decrementQuantity}>-</button>
                            <span className="mx-2">{quantity}</span>
                            <button className="btn btn-xs" onClick={incrementQuantity}>+</button>
                        </div>

                    </div>
                    <button className="btn btn-xs" onClick={handleDeleteFromCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
