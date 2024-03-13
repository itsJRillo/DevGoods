import supabase from '@/app/supabaseClient'
import { storageProductURL, storageURL } from '@/app/utils'
import { useUser } from '@/app/utils/useUser'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

type Product = {
    id: number
    name: string
    price: number
    description: string
    brand: string
    avatarUrl: string
}

export default function ProductCard({ id, name, price, description, avatarUrl }: Product) {
    const router = useRouter()
    const user = useUser()

    const handleAddCart = async () => {

        const { data, error } = await supabase
            .from('cart')
            .insert([
                { user_id: user?.id, product_id: id, quantity: 1 },
            ])
            .select()

        if (error) {
            console.log(error);
        } else {
            toast.success("Item added to the cart")
        }
    }


    return (
        <>
            <div className="card w-70 bg-base-100 shadow-xl">
                <figure><img onClick={() => { router.push(`/products/${id}`) }} src={`${storageProductURL}/${avatarUrl}`} alt={name} className='cursor-pointer' /></figure>
                <div className="card-body">
                    <div className='flex flex-row justify-around gap-2'>
                        <h2 className="text-lg font-extrabold">
                            {name}
                            {/* FUTURE IMPLEMENTATION: ROW ITEM DATE ADDED <div className="badge badge-secondary">NEW</div>"*/}
                        </h2>
                        <h2 className='card-title'>{price}€</h2>
                    </div>
                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{description}</p>
                    <button className='btn btn-primary rounded hover:bg-white hover:text-black' onClick={handleAddCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}
