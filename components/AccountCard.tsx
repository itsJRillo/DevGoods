import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AccountCard({ title, desc, url, icon }: { title: string, desc: string, url: string, icon: string }) {
    const router = useRouter();
    return (
        <>
            <div className="card w-70 border border-black rounded hover:cursor-pointer hover:scale-95 transition delay-75 ease-in-out" onClick={() => { router.push(`${url}`) }}>
                <div className='flex flex-row items-center'>
                    <div className="avatar w-1/3 items-center justify-center">
                        <div className="w-28 rounded">
                            <Image src={icon} alt="icon" width={100} height={50} />
                        </div>
                    </div>
                    <div className="card-body w-1/2">
                        <h2 className="card-title">{title}</h2>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
