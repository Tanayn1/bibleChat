'use client'
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client';
import SideNav from '@/components/sideNav';
import AvatarDropdown from '@/components/avatarDropdown';
import BottomNav from '@/components/bottomNav';
import Image from 'next/image';
import MobileSidebar from '@/components/mobileSidebar';

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
          return;
        } 

    }
    useEffect(()=>{
        checkUser();
    },[])

  return (
    <div className=' flex '>
      <div className=' lg:hidden md:hidden fixed top-0'>
      </div>
      <SideNav/>
      <MobileSidebar/>
      <div className=' lg:ml-56 md:ml-56 w-full '>
        {children}
      </div>
      <div className=' fixed top-0 right-0'>
        <AvatarDropdown/>
      </div>
    </div>
  )
}
