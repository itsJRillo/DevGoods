import supabase from '@/app/supabaseClient'
import { ReviewsUser, storageURL, dateFormatter } from '@/app/utils'
import { Rating } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

export default function ReviewUser({ review }: { review: any }) {
    const [reviewUser, setReviewUser] = useState<ReviewsUser>()

    const getUser = async () => {
        const { data, error } = await supabase.from("users").select("*").eq("id", review.user_id)
        if (!error) {
            return data[0]
        }
    }
    useEffect(() => {
        const reviewUserPromise = getUser();

        reviewUserPromise.then(reviewUser => {
            setReviewUser(reviewUser)
        });
    })


    return (

        <>
            <div className="flex items-start mb-5">
                <div tabIndex={0} role="button" className="avatar">
                    <div className="w-9 rounded-full">
                        <img src={`${storageURL}${reviewUser?.avatar_url}`} alt="avatar" />
                    </div>
                </div>
                <div className="ml-3">
                    <h4 className="text-sm font-bold text-[#333]">{reviewUser?.username}</h4>
                    <div className="flex space-x-1 mt-1">
                        <Rating readonly placeholder value={review.rating} />
                        <p className="text-xs !ml-2 font-semibold text-[#333]">{dateFormatter(review.created_at)}</p>
                    </div>
                    <p className="text-sm mt-4 text-[#333]">{review.comment}</p>
                </div>
            </div>
        </>
    )
}
