import React from 'react'
import { IoMdMailUnread } from 'react-icons/io'

export default function Page() {
  return (
    <div className=' flex justify-center h-screen items-center'>
    <div className=' border border-zinc-800'>
        <div className=' m-2 flex justify-center'>
        <IoMdMailUnread className=' h-24 w-24' />

        </div>
        <div className=' m-4'>
            <h1 className=' text-2xl font-semibold text-center'>Please Verify Your Email</h1>
    
            <div className=' m-5'>
                <h1 className=' text-sm text-gray-300 text-center'>An Email has been sent with a link to verify your email</h1>
            </div>
        </div>
    </div>
</div>
  )
}
