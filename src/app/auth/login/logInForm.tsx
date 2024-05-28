'use client'
import React, { useState } from 'react'
import { login } from '../actions';

export default function LogInForm() {
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = ()=>{
        setIsLoading(true)
        if (email && password) {
        login(email, password)
        } else {
            alert('Fill Out All Fields')
        }
        setIsLoading(false)
    }
  return (
    <div className=' border border-gray-100 rounded-xl'>
        <div className=' m-8'> 
            <h1 className=' text-xl font-bold'>Sign In</h1>
            <p className=' text-xs mt-2'>Sign In to continue</p>
            <div className=' m-4'>
                <div>
                    <h1 className=' text-xs font-semibold mb-2 ml-1'>Email</h1>
                    <input onChange={(e)=>{setEmail(e.target.value)}} 
                    type='text' placeholder='Email' className=' input input-bordered'/>
                </div>
                <div className=' my-2'>
                    <h1 className=' text-xs font-semibold mb-2 ml-1'>Password</h1>
                    <input onChange={(e)=>{setPassword(e.target.value)}} 
                    type='password' placeholder='Password' className=' input input-bordered'/>
                </div>

                <div className=' my-3'>
                    <button disabled={isLoading} onClick={handleLogin} className=' btn btn-wide'>Log In</button>
                </div>
            </div>
        </div>
    </div>
  )
}
