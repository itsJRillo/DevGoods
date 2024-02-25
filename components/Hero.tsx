import React from 'react'

export default function Hero() {
    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(/hero-background.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Shopping Simplified, Joy Amplified!</h1>
                        <p className="mb-5">Explore a seamless shopping experience with our user-friendly e-commerce platform. Discover quality products, hassle-free navigation, and a straightforward checkout process. Elevate your online shopping journey with us!</p>
                    </div>
                </div>
            </div>
        </>
    )
}
