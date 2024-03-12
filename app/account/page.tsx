"use client";

import React, { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';

import supabase from '@/app/supabaseClient';
import AvatarPicker from '@/components/AvatarPicker';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tranquiluxe } from "uvcanvas"
import { dateFormatter } from '@/app/utils';

const storageURL = "https://iovmeejceocblildcubg.supabase.co/storage/v1/object/public/avatars/public"

export default function Account() {

  const [currentUser, setCurrentUser] = useState<User | null>();
  const [avatar, setAvatar] = useState("");


  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleAvatarChange = async (avatar: string) => {
    const base64 = avatar.split('base64,')[1];
    const image = decode(base64);
    const urlImage = `/avatar_${currentUser?.id}.png`;
    console.log(urlImage);
    
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(`public/${urlImage}`, image, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error(error.message);
    } else {
      setAvatar(urlImage)
      
      console.log();
      
      const { data, error } = await supabase.auth.updateUser({
        data: { avatar_url: urlImage }
      })

      if (error) {
        console.log(error.message);
      } else {
        window.location.reload()
      }
    }
  };

  const openModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full bg-transparent bg-opacity-0 border border-gray-200 rounded-lg shadow">
        <div className="flex justify-end px-4 pt-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-gray-100 rounded-box w-52 mt-4">
              <li>
                <button>Edit</button>
              </li>
              <li>
                <button>Delete Account</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center pb-10">
          <Tranquiluxe />
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${storageURL}/${currentUser?.user_metadata.avatar_url}`} alt="profile image" />
          <h3 className="mb-1 text-xl text-gray-900 font-extrabold">{currentUser?.user_metadata.username}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</span>
          <span className="text-sm text-gray-500 dark:text-gray-600">Created at {dateFormatter(currentUser?.created_at)}</span>
          <div className="flex mt-4 md:mt-6">
            <button className="btn inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={openModal}>
              Change Avatar
            </button>
          </div>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <AvatarPicker onAvatarChange={handleAvatarChange} />
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <hr />
      <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow">

      </div>
    </>
  );
}


