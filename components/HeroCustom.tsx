import React from 'react'

export default function HeroCustom({title, desc}:{title: string, desc: string}) {
    return (
        <>
            <div className="hero min-h-96" style={{ backgroundImage: 'url(/hero-background.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                        <p className="mb-5">{desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
