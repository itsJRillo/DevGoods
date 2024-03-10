import { useEffect, useState } from 'react';
import supabase from '@/app/supabaseClient';
import { User } from '@supabase/supabase-js';


export const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return currentUser;
};