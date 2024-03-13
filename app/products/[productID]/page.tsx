"use client";

import React, { useEffect, useState } from 'react'
import supabase from '@/app/supabaseClient'
import ReviewUser from '@/components/ReviewUser'
import { useUser } from '@/app/utils/useUser'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewLayout from '@/components/ReviewLayout';
import { Rating } from '@material-tailwind/react';
import { storageProductURL } from '@/app/utils';

type Product = {
    id: number
    name: string
    price: number
    description: string
    brand: string
    photo_url: string
}

type Review = {
    id: number
    user_id: number
    product_id: number
    rating: number
    comment: string
    created_at: string
}

export default function ProductDetails(this: any, { params }: { params: { productID: string } }) {
    const [product, setProduct] = useState<Product>()
    const [reviews, setReviews] = useState<Review[]>([])
    const currentUser = useUser()

    const getProduct = async () => {
        const { data, error } = await supabase.from("products").select("*").eq("id", params.productID)

        if (error) {
            console.log(error.message);
        } else {
            setProduct(data[0])
        }
    }

    const getReviews = async () => {
        const { data: review, error } = await supabase.from("reviews").select("*").eq("product_id", params.productID)
        if (error) {
            console.log(error.message);
        } else {
            setReviews(review)
        }
    }

    useEffect(() => {
        getProduct()
        getReviews()
    }, [])

    const handleAddCart = async () => {

        const { data, error } = await supabase
            .from('cart')
            .insert([
                { user_id: currentUser?.id, product_id: product?.id, quantity: 1 },
            ])
            .select()

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            toast.success("Item added to the cart")
        }

    }

    const openModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    const handleAddFavourites = () => {

    }

    return (
        <>
            <ToastContainer />
            <div className="bg-white">
                <div className="p-6 max-w-7xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="px-4 py-10 rounded-xl">
                                <img src={`${storageProductURL}/${product?.photo_url}`} alt="Product" className="w-4/5 rounded object-cover" />
                                <button type="button" onClick={handleAddFavourites} className="absolute top-4 right-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            {!product ? (
                                <>
                                    <div className='skeleton'>
                                        <h2 className=""></h2>
                                    </div>

                                    <div className='flex flex-wrap gap-4 mt-6 skeleton'>
                                        <p className="w-4"></p>
                                    </div>
                                    <div className="flex space-x-2 mt-4">

                                        <Rating readonly placeholder value={0} />

                                        {/*<h4 className="text-[#333] text-base"> FUTURE IMPLEMENTATION: ADD REVIEW COLUMN SUPABASE </h4>*/}
                                    </div>
                                    <div className='text-sm font-normal mt-10 text-[#333]'>
                                        <p></p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-10">
                                        <button type="button" className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-bold rounded">Buy now</button>
                                        <button type="button" className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded" onClick={handleAddCart}>Add to cart</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-extrabold text-[#333]">{product?.name}</h2>

                                    <div className='flex flex-wrap gap-4 mt-6'>
                                        <p className="text-[#333] text-4xl font-bold">{product?.price} €</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4">

                                        <Rating readonly placeholder value={0} />

                                        <h4 className="text-[#333] text-base">{reviews.length} Reviews</h4>
                                    </div>
                                    <div className='text-sm font-normal mt-10 text-[#333]'>
                                        <p>{product?.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-10">
                                        <button type="button" className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-bold rounded">Buy now</button>
                                        <button type="button" className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded" onClick={handleAddCart}>Add to cart</button>
                                    </div>
                                </>)
                            }


                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">

                        <h3 className="text-lg font-bold text-[#333]">Reviews({reviews.length})</h3>
                        <div className="grid md:grid-cols-2 gap-12 mt-6">
                            <div>
                                <div className="space-y-3">
                                    {reviews.map(review => {
                                        // Calculate average rating
                                        const totalRatings = reviews.length;
                                        const averageRating = totalRatings > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings : 0;

                                        // Display average rating dynamically
                                        return (
                                            <div className="flex items-center" key={review.id}>
                                                <p className="text-sm text-[#333] font-bold">{averageRating.toFixed(1)}</p>
                                                <svg className="w-5 fill-[#333] ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                </svg>
                                                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                                                    <div className={`w-[${averageRating * 20}%] h-full rounded bg-[#333]`}></div>
                                                </div>
                                                <p className="text-sm text-[#333] font-bold ml-3">{(averageRating * 20).toFixed(0)}%</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <hr className='my-5' />
                                <div className='p-2'>
                                    <h2 className='text-xl font-bold mb-3'>Rate this product</h2>
                                    <p className='my-3'>Share your opinion with other customers</p>
                                    <button className='btn btn-primary rounded w-full' onClick={openModal}>Write a review</button>

                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <ReviewLayout productID={product?.id} />
                                            </form>
                                        </div>
                                    </dialog>
                                </div>
                            </div>

                            <div>
                                {reviews?.map((r: any) => (
                                    <ReviewUser key={r.id} review={r} />
                                ))}
                                <button type="button" className="rounded-full w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold">Read all reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
