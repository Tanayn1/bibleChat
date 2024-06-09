'use client'
import React, { useState } from 'react'
import { login, signUpWithGoogle } from '../actions';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/client';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

export default function LogInForm() {
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleGoogle = async () => {
        setIsLoading(true);
        await signUpWithGoogle();
        setIsLoading(false)
    }  

    const handleLogin = async  ()=>{
        setIsLoading(true)
        if (email && password) {
         const  { error } = await login(email, password)
            if (error) {
                toast.error('Invalid Login Information')
                setIsLoading(false)
                return;
            }
        } else {
            toast.error('Fill Out All Fields')
            setIsLoading(false)
            return;
        }
        router.push('/dashboard')
        setIsLoading(false)
    }
  return (
    <div className=' border border-zinc-800 rounded-xl'>
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
                    <p className=' text-center text-xs text-gray-300 my-3'>Or</p>
                    <button onClick={handleGoogle} className=' btn btn-wide hover:bg-purple-800 bg-purple-700 text-md '><FcGoogle className=' h-6 w-6'/>Google</button>
                    <div className=' flex justify-center mt-2'>
                        <p className=' text-xs text-gray-300'>Don&apos;t have an account?</p>
                        <a href='/auth/signup' className=' text-xs font-bold text-purple-700 ml-4'>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
