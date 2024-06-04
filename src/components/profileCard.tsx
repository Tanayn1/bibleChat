'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import { User } from '@supabase/supabase-js';
import PricingModal from './pricingModal';

export default function ProfileCard() {
    const supabase = createClient();
    const [user, setUser] = useState<null | any>(null);
    const [modal, setModal] = useState<boolean>(false)
    const fetchData = async ()=>{
       const userID = (await supabase.auth.getUser()).data.user?.id
       const { data, error } = await supabase
       .from('users')
       .select('*')
       .eq('id', userID);
       if (error) console.log(error);
       if (data) setUser(data[0]);
    };

    const handleClick = async ()=>{
        if (user.plan === 'free') {
            setModal(true)
        } else {
            try {
                const body = JSON.stringify({
                    customerID: user.stripe_customer_id 
                })
                const response = await fetch('/api/stripe/createPortalSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body,
                })
                const url = await response.json();
                window.location.replace(url);
            } catch (error) {
                console.log(error)
                //toast
            }
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
  if (user) {return (
    <div className=' bg-zinc-950 rounded-xl'>
        <div className=' m-5'>
            <div className=' flex flex-col items-center'>
                <div tabIndex={0} role="button" className="avatar placeholder cursor-pointer">
                    <div className="bg-neutral text-neutral-content rounded-full w-32 mobile:w-8">
                        <span className=" text-4xl font-md mobile:text-xs">{user.email?.slice(0,2).toUpperCase()}</span>
                    </div>
                </div>
                    <div className={`${user.plan === 'free' ? 'bg-black' : 'bg-yellow-600'} 
                    badge mt-3 p-5 px-14 font-semibold`}>
                        {user.plan === 'free' ? 'Free' : 'Pro'}
                    </div>
                <div className=' m-5'>
                    <div className=' mb-3  flex flex-col'>
                        <label htmlFor="">Name</label>
                        <input disabled type="text" className=' input input-bordered' value={user.name} />
                    </div>
                    <div className=' mb-3  flex flex-col'>
                        <label htmlFor="">Email</label>
                        <input disabled type="text" className=' input input-bordered' value={user.email} />
                    </div>
                    <button onClick={handleClick} className=' btn mt-3 w-full '>{user.plan === 'free' ? 'Upgrade' : 'Manage Billing'}</button>
                </div>
            </div>
        </div>
        <PricingModal setIsShow={(value : boolean)=>{setModal(value)}} show={modal} />
    </div>
  )} else {
    return (
        <div className=' bg-zinc-950 rounded-xl'>
            <div className=' m-5'>
                <div className=' flex flex-col items-center' >
                    <div className="skeleton w-32 mobile:w-8 h-32 mobile:h-8 rounded-full shrink-0"></div>
                    <div className="skeleton w-32 mobile:w-8 h-10 mobile:h-8 mt-3  "></div>
                    <div className=' skeleton w-44 h-12 mt-3'></div>
                    <div className=' skeleton w-44 h-12 mt-3'></div>
                    <div className=' skeleton w-44 h-12 mt-3'></div>
                </div>
            </div>
        </div>
    )
  }
}
