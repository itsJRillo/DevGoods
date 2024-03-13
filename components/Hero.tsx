import { useRouter } from 'next/navigation'
import React from 'react'
import { Novatrix } from "uvcanvas"

export default function Hero() {
    const router = useRouter()

    return (    
        <>
            <div className="hero min-h-screen">
                <Novatrix />
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Shopping Simplified, Joy Amplified!</h1>
                        <p className="mb-5">Explore a seamless shopping experience with our user-friendly e-commerce platform. Discover quality products, hassle-free navigation, and a straightforward checkout process. Elevate your online shopping journey with us!</p>
                        <button className='btn btn-primary rounded hover:bg-white hover:text-black' onClick={() => {router.push("/products")}}>Let&apos;s get started → </button>
                    </div>
                </div>
            </div>
        </>
    )
}
