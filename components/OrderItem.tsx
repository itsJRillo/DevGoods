import supabase from '@/app/supabaseClient';
import { Product, storageProductURL } from '@/app/utils';
import React, { useEffect, useState } from 'react'

export default function OrderItem(product: any) {
    const [data, setData] = useState<Product>();

    const getProductOrder = async () => {
        const { data, error } = await supabase.from("products").select("*").eq("id", product.product.product_id);

        if (error) {
            console.log(error.message);
        } else {
            setData(data[0]);
        }
    }

    useEffect(() => {
        getProductOrder()
    },[]);

    return (
        <>
            <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">

                <div className="img-box max-lg:w-full">
                    <img src={`${storageProductURL}${data?.photo_url}`} alt={`${data?.name}`} 
                        className="w-full lg:max-w-[140px] aspect-auto" />
                </div>

                <div className="flex flex-row items-center w-full ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                        <div className="flex items-center">
                            <div className="">
                                <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                    {data?.name}
                                </h2>
                            </div>

                        </div>
                        <div className="grid grid-cols-5">
                            <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                    <p className="font-medium text-sm leading-7 text-black">Price</p>
                                    <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                        {data?.price}€
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                    <p className="font-medium text-sm leading-7 text-black">Status
                                    </p>
                                    <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                        Completed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
