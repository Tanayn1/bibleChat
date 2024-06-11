'use client'
import React from 'react'
import { createClient } from '../../../../utils/supabase/client'

export default function Page() {
    const supabase = createClient()
  return (
    <div className=' flex justify-center h-screen items-center'>
        <div className=' border border-zinc-800'>
            <div className=' m-4'>
                <h1 className=' text-2xl font-semibold'>Please Verify Your Email</h1>
                <div className=' m-5'>
                    <h1 className=' text-xs text-gray-300'>An Email will be sent to your inbox with a link to confirm</h1>
                    <button className=' btn bg-purple-600 hover:bg-purple-700 mt-3'>Send Email</button>
                </div>
            </div>
        </div>
    </div>
  )
}
