import { useRouter } from 'next/navigation'
import React from 'react'

type Product = {
    id: number
    name: string
    price: number
    description: string
    brand: string
}

export default function ProductCard({ id, name, price, description }: Product) {
    const router = useRouter()
    return (
        <>
            <div className="card cursor-pointer w-70 transition ease-in-out delay-150 hover:scale-95 bg-base-100 shadow-xl" onClick={() => { router.push(`/products/${id}`) }}>
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={name} /></figure>
                <div className="card-body">
                    <div className='flex flex-row justify-between'>
                        <h2 className="card-title">
                            {name}
                            {/* FUTURE IMPLEMENTATION: ROW ITEM DATE ADDED <div className="badge badge-secondary">NEW</div>"*/}
                        </h2>
                        <h2 className='card-title'>{price}€</h2>
                    </div>
                    <p>{description}</p>
                    <button className='btn btn-primary rounded hover:btn-secondary'>Check</button>
                </div>
            </div>
        </>
    )
}
