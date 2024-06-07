'use client'
import React, { useState } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { createClient } from '../../utils/supabase/client'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function OnboardingForm() {
    const supabase = createClient();
    const [timezone, setTimezone] = useState<null | string>(null);
    const [prayerTime, setPrayerTime] = useState<null | number>(null);
    const router = useRouter();
    const handleSubmit = async ()=>{
        const userID = (await supabase.auth.getUser()).data.user?.id;
        const email = (await supabase.auth.getUser()).data.user?.email;
        const {data: userData, error: userError} = await supabase
        .from('users')
        .select()
        .eq('id',userID);
        const displayName = userData && userData[0].name
        if (!userID || !email) {
            toast.error('Internal Server Error, Please Try Again');
            return;
        }
        const { data, error } = await supabase
        .from('email_notifications')
        .insert({
            id: userID,
            email: email,
            diplay_name: displayName,
            timezone: timezone,
            prayer_time: prayerTime,
        });
        if (error) {
            toast.error('Internal Server Error, Please Try Again')
            return;
        }
        router.push('/dashboard')

    }
  return (
    <div className=' border border-zinc-800 md:w-[400px] mobile:w-[340px]'>
        <div className=' m-4' >
            <h1 className=' text-xl'>Daily Prayer Reminder</h1>
            <p className=' text-gray-300 text-sm'>Select your daily prayer time for daily reminders</p>
            <div className=' m-4'>
                <select className=' select select-bordered w-full' name="Country" id="Country">
                    <option disabled value="Country">Country Time</option>
                </select>
                <select className=' select select-bordered my-3 w-full' name="Country" id="Country">
                    <option disabled value="Country">Time Slot</option>
                </select>
                <button className=' btn w-full bg-purple-700 hover:bg-purple-800 border-none hover:border-none'>Enable<IoIosNotifications className=' h-5 w-5' /> </button>
                <button className=' btn w-full my-3'>Continue Without</button>
            </div>
        </div>
    </div>
  )
}
