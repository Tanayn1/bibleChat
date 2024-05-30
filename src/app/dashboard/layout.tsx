'use client'
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client';
import SideNav from '@/components/sideNav';

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
      <SideNav/>
      <div className=' w-full'>
        {children}
      </div>
    </div>
  )
}
