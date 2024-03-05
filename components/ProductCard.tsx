import React from 'react'

type Card = {
    id: number
    name: string
    price: number
    description: string
    brand: string
}

export default function ProductCard({ name, price, description, brand, }: Card) {
    return (
        <>
            <div className="card w-70 bg-base-100 shadow-xl">
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
                </div>
            </div>
        </>
    )
}
