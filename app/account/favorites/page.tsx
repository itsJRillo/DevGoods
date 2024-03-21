"use client";

import supabase from '@/app/supabaseClient';
import ReviewUser from '@/components/ReviewUser';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

type Review = {
    id: number
    user_id: number
    product_id: number
    rating: number
    comment: string
    created_at: string
}
export default function AccountReviews() {

    let user: User;
    if(typeof window!== 'undefined') {
        JSON.parse(localStorage.getItem("sb-iovmeejceocblildcubg-auth-token") || "{}").user;
    }

    const [reviews, setReviews] = useState<Review[] | null>([])

    const getReviews = async () => {
        const { data: review, error } = await supabase.from("reviews").select("*").eq("user_id", user.id)

        if (error) {
            console.log(error.message);
        } else {
            setReviews(review)
        }
    }

    useEffect(() => { getReviews() }, [])
    
    return (
        <div>

            <div className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-row justify-around">
                <div className='p-10 flex flex-col items-center'>
                    <h1 className='text-2xl font-extrabold'>Reviews</h1>
                    {reviews === null ? (
                        <>
                            <p className='text-black text-sm font-bold p-10'>You don`t have any reviews yet</p>
                        </>
                    ) : (
                    <div className='m-10'>
                        {reviews?.map((r: any) => (
                            <ReviewUser key={r.id} review={r} />
                        ))}
                    </div>
                    )}
                </div>

            </div>
        </div>
    )
}
