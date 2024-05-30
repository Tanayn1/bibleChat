'use client'
import React, { useState } from 'react'
import { signup } from '../actions';

export default function SignUpForm() {
    const [name, setName] = useState<null | string>(null);
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [confirmPassword, setConfirmPassword] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const handleSignUp = ()=>{
        setIsLoading(true)
        if (name && email && password && confirmPassword) {
            signup(name, email, password, confirmPassword)
        } else {
            alert('Fill out all fields')
        }
        setIsLoading(false)
    }
  return (
    <div className=' border border-gray-100 rounded-xl'>
        <div className=' m-8'> 
            <h1 className=' text-xl font-bold'>Sign Up</h1>
            <p className=' text-xs mt-2'>Sign up to get started</p>
            <div className=' m-4'>
                <div className=' mb-2'>
                    <h1 className=' text-xs font-semibold mb-2 ml-1'>Name</h1>
                    <input onChange={(e)=>{setName(e.target.value)}} 
                    type='text' placeholder='Name' className=' input input-bordered'/>
                </div>
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
                <div>
                    <h1 className=' text-xs font-semibold mb-2 ml-1'>Confirm Password</h1>
                    <input onChange={(e)=>{setConfirmPassword(e.target.value)}} 
                    type='password' placeholder='Confirm Password' className=' input input-bordered'/>
                </div>
                <div className=' my-3'>
                    <button disabled={isLoading} onClick={handleSignUp} className=' btn btn-wide'>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  )
}
