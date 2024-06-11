'use client'
import React, { useState } from 'react'
import { signUpWithGoogle, signup } from '../actions';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

export default function SignUpForm() {
    const [name, setName] = useState<null | string>(null);
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [confirmPassword, setConfirmPassword] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGoogle = async () => {
        setIsLoading(true);
        await signUpWithGoogle();
        setIsLoading(false)
    }  
    
    const handleSignUp = ()=>{
        setIsLoading(true)
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                signup(name, email, password, confirmPassword)
            } else {
                toast.error('Passwords Must Match')
                setIsLoading(false)
            }
        } else {
            toast.error('Fill out all fields')
            setIsLoading(false)

        }
    }
  return (
    <div className=' border border-zinc-700 rounded-xl mx-4'>
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
                    <button disabled={isLoading} onClick={handleSignUp} className=' btn btn-wide'>{isLoading ? <div className=' loading loading-dots'></div>:  'Sign Up'}</button>
                    <p className=' text-center text-xs text-gray-300 my-3'>Or</p>
                    <button disabled={isLoading} onClick={handleGoogle} className=' btn btn-wide hover:bg-purple-800 bg-purple-700 text-md '><FcGoogle className=' h-6 w-6'/>Google</button>
                    <div className=' flex justify-center mt-2'>
                        <p className=' text-xs text-gray-300'>Aldready have an account?</p>
                        <a href='/auth/login' className=' text-xs font-bold text-purple-700 ml-4'>Log In</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
