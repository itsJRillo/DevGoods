import React from 'react'
import supabase from '../supabaseClient'
import { User } from '@supabase/supabase-js'

export default function Account() {

  async function getUser() {
    return await supabase.auth.getUser()
  }

  return (
    <div>page</div>
  )
}
