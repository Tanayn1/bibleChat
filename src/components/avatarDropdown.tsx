'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AvatarDropdown() {
    const supabase = createClient();
    const [intials, setIntials] = useState<null | string>(null);
    const router = useRouter();
    const fetchData = async ()=>{
        const {data, error} = await supabase.auth.getUser()
        if (error) {
            return;
        }
        const userEmail = data.user.email;
        const i = userEmail?.slice(0,2).toUpperCase()
        i && setIntials(i)
    }
    useEffect(()=>{
        fetchData();
    },[])
    const handleLogOut = async ()=>{
        const { error } = await supabase.auth.signOut()
        if (error) {
            return;
        }
        router.push('/')

    }
  return (
    <div className=' flex items-center m-4'>
        {intials ? <div className=' dropdown dropdown-left'>
        <div tabIndex={0} role="button" className="avatar placeholder cursor-pointer">
            <div className="bg-neutral text-neutral-content rounded-full w-12 mobile:w-8">
                <span className="mobile:text-xs">{intials}</span>
            </div>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <Link href={'/dashboard/profile'}><li><a>Profile</a></li></Link>
            <li onClick={handleLogOut}><a>Log out</a></li>
        </ul>
        </div> : 
        <div className="skeleton w-12 mobile:w-8 h-12 mobile:h-8 rounded-full shrink-0"></div>}
    </div>
  )
}
