import React, { useState } from 'react'
import { Rating } from "@material-tailwind/react";
import supabase from '@/app/supabaseClient';
import { useUser } from '@/app/utils/useUser';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewLayout({ productID }: { productID: number | undefined }) {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState("");
    const user = useUser()

    const handleReview = async () => {
        if (user?.id == null) {
            toast.error("You must be logged in to write a review")
            
        } else {
            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    { user_id: user?.id, comment: comments, rating: rating, product_id: productID },
                ])
                .select()

            if (!error) {
                window.location.reload()
            }
        }
    }

    const handleComments = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setComments(event.currentTarget.value)
    }

    return (
        <>
            <ToastContainer/>
            <div>
                <label htmlFor="comment" className='text-xl font-bold mb-10'>Comments</label>
                <div className="px-4 py-2 bg-white rounded-t-lg">
                    <label htmlFor="comment" className="sr-only">Your review</label>
                    <textarea id="comment" className="p-2 w-full px-2 text-sm bg-white border-0 text-black" placeholder="Write a review..." onChange={(e) => { handleComments(e) }} />
                    <div className='flex items-center gap-2'>
                        <p>Rate this product</p>
                        <Rating placeholder value={rating} onChange={(value) => setRating(value)} />
                    </div>
                </div>

                <div className='flex justify-evenly gap-2 mx-2.5 mt-3'>
                    <button className='btn btn-primary w-full' onClick={handleReview}>Review</button>
                </div>
            </div>
        </>
    )
}
