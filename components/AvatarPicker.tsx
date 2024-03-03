// AvatarPicker.tsx
import React, { useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import AvatarEditor from 'react-avatar-editor';
import Image from 'next/image';

interface AvatarPickerProps {
  onAvatarChange: (avatar: string) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onAvatarChange }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const avatarDataUrl = canvas.toDataURL();
      onAvatarChange(avatarDataUrl);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-5 space-x-4 card w-96 bg-indigo-600 shadow-xl">

      {/* File Input */}
      <div>
        <h3 className="mb-4 text-md font-extrabold leading-none tracking-tight text-gray-900 md:text-base lg:text-xl dark:text-white">Choose an avatar</h3>
        <input
          className="block w-full text-sm text-white  
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-indigo-400 file:text-white
          hover:file:bg-indigo-300"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <p className="mt-1 text-sm text-slate-900 dark:text-gray-300" id="file_input_help">SVG, PNG or JPG (Max. 800x400px).</p>
      </div>

      {/* Avatar Editor or Placeholder */}
      {avatar ? (
        <AvatarEditor
          ref={(ref: any) => setEditor(ref)}
          image={avatar}
          width={100}
          height={100}
          border={10}
          borderRadius={100}
        />
      ) : (
        <div className='avatar'>
          <div tabIndex={0} role="button" className="avatar">
            <div className="w-24 rounded-full">
              <img src="/profile-avatar.png" alt="avatar" />
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div>
        <button
          className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSaveAvatar}
        >
          Save Avatar
        </button>
      </div>
    </div>

  );
};

export default AvatarPicker;
