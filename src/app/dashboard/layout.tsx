'use client'
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client';
import SideNav from '@/components/sideNav';
import AvatarDropdown from '@/components/avatarDropdown';
import BottomNav from '@/components/bottomNav';
import Image from 'next/image';

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter()
    const supabase = createClient()
    const checkUser = async ()=>{
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
          router.push('/auth/login')
        }
    }
    useEffect(()=>{
        checkUser();
    },[])

  return (
    <div className=' flex'>
      <div className=' lg:hidden md:hidden fixed top-0'>
        <Image alt='logo'src={'/holyharmonywithoutwordswhite.png'} width={75} height={75}/>
      </div>
      <SideNav/>
      <div className=' w-full'>
        {children}
      </div>
      <div className=' fixed top-0 right-0'>
        <AvatarDropdown/>
      </div>
      <BottomNav/>
    </div>
  )
}
