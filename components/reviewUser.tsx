import React from 'react'

export default function ReviewUser() {
    // const {data: {user}} = supabase.auth.getUser()
    const storageURL = "https://iovmeejceocblildcubg.supabase.co/storage/v1/object/public/avatars/public"

    return (
        <>
            <div className="flex items-start">
                <div tabIndex={0} role="button" className="avatar">
                    <div className="w-9 rounded-full">
                        <img src={`${storageURL}/profile-avatar.png`} alt="avatar" />
                    </div>
                </div>
                <div className="ml-3">
                    <h4 className="text-sm font-bold text-[#333]">John Doe{/* {username} */}</h4>
                    <div className="flex space-x-1 mt-1">
                        {new Array(5).fill(0).map((index) => (
                            <svg key={index} className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                        ))}

                        <p className="text-xs !ml-2 font-semibold text-[#333]">{/* {created_at} */}2 mins ago</p>
                    </div>
                    <p className="text-sm mt-4 text-[#333]">{/* {comment} */}Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </>
    )
}
