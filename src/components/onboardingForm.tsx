'use client'
import React, { useState } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { createClient } from '../../utils/supabase/client'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OnboardingForm() {
    const supabase = createClient();
    const [timezone, setTimezone] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();
    const handleSubmit = async ()=>{
        setIsLoading(true)
        const userID = (await supabase.auth.getUser()).data.user?.id;
        const email = (await supabase.auth.getUser()).data.user?.email;
        const {data: userData, error: userError} = await supabase
        .from('users')
        .select()
        .eq('id',userID);
        const displayName = userData && userData[0].name
        if (!userID || !email) {
            toast.error('Internal Server Error, Please Try Again');
            setIsLoading(false)
            return;
        }
        const { data, error } = await supabase
        .from('email_notifications')
        .insert({
            email: email,
            diplay_name: displayName,
            timezone: timezone,
        });
        if (error) {
            toast.error('Internal Server Error, Please Try Again')
            setIsLoading(false)
            return;
        }
        router.push('/dashboard')

    }
  return (
    <div className=' border border-zinc-800 md:w-[400px] mobile:w-[340px]'>
        <div className=' m-4' >
            <h1 className=' text-xl'>Daily Prayer Reminder</h1>
            <p className=' text-gray-300 text-sm'>Turn On Daily Prayer Reminders</p>
            <div className=' m-4'>
                <select onChange={(e)=>{setTimezone(e.target.value)}} className=' select select-bordered w-full my-3' name="Country" id="Country">
                    <option disabled selected value="Country">Time Zone</option>
                    <option value="UTC-6">North America</option>
                    <option value="UTC-6">South America</option>
                    <option value="UTC+2">Europe</option>
                    <option value="UTC+9">Pacific</option>
                    <option value="UTC+2">Africa</option>
                </select>
                <button disabled={isLoading} onClick={handleSubmit} className=' btn w-full bg-purple-700 hover:bg-purple-800 border-none hover:border-none'>Enable<IoIosNotifications className=' h-5 w-5' /> </button>
                <Link href={'/dashboard'}>
                    <button  className=' btn w-full my-3'>Continue Without</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
