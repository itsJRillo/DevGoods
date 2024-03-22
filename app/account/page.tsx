"use client";

import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

import AccountCard from '@/components/AccountCard';

export default function Account() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className='text-3xl font-bold'>My account</h1>
        <div className='grid grid-cols-2 grid-rows-2 gap-2 m-10'>
          <AccountCard title='My orders' desc='Follow-up, return a product or repeat previous purchases' url='/account/orders' icon="/order.png"/>
          <AccountCard title='Login & Security' desc='Edit name, avatar, e-mail address and password' url='/account/edit-account' icon="/security.png"/>
          <AccountCard title='My favorites' desc='Edit, delete or modify all reviews of your favorite products' url='/account/favorites' icon="/favorite.png"/>
          <AccountCard title='My payments' desc='Manage payment methods and settings, view all transactions' url='/account/payments' icon="/payment.png"/>
        </div>
      </div>
    </>
  );
}


