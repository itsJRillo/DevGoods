import supabase from '@/app/supabaseClient'
import { Product, storageProductURL, storageURL } from '@/app/utils'
import { useUser } from '@/app/utils/useUser'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export default function ProductCard({ product }: { product: Product }) {
    const router = useRouter()
    const user = useUser()

    const { id, name, price, description, photo_url } = product;

    const handleAddCart = async () => {
        const { error } = await supabase
            .from('cart')
            .insert([
                { user_id: user?.id, product_id: id, quantity: 1 },
            ])
            .select()

        if (!error) {
            toast.success("Item added to the cart")
        }
    }

    const handleCheckout = async () => {
        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify([product, user]),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const session = await res.json();

        window.location = session.url;
    }


    return (
        <>
            <div className="card w-70 bg-base-100 shadow-xl">
                <figure><img onClick={() => { router.push(`/products/${id}`) }} src={`${storageProductURL}/${photo_url}`} alt={name} className='cursor-pointer' /></figure>
                <div className="card-body">
                    <div className='flex flex-row justify-around gap-2'>
                        <h2 className="text-lg font-extrabold">
                            {name}
                            {/* FUTURE IMPLEMENTATION: ROW ITEM DATE ADDED <div className="badge badge-secondary">NEW</div>"*/}
                        </h2>
                        <h2 className='card-title'>{price}€</h2>
                    </div>
                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{description}</p>
                    <div className='flex gap-3'>
                        <button className='btn btn-primary rounded hover:bg-white hover:text-black' onClick={handleAddCart}>Add to Cart</button>
                        <button className='btn btn-primary bg-white text-black rounded hover:bg-black hover:text-white' onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}
