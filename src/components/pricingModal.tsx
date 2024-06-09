'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { createClient } from '../../utils/supabase/client';
import { toast } from 'sonner';

export default function PricingModal({setIsShow , show} 
  : {setIsShow : Function, show : boolean}) {
  const [selected, setSelected] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const supabase = createClient();
  const checkout = async ()=>{
    try {
      if (!selected) {
        toast.error('Please select a plan')
        return 
      }
      setIsLoading(true)
      const {data, error} = await supabase.auth.getUser()
      if (error) return;
      const email = data.user.email;
      const userID = data.user.id
      if (selected) {
        const body = JSON.stringify({
          userID: userID,
          email: email,
          priceID: selected
        })
        const response = await fetch('/api/stripe/createCheckOutSession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        });
        console.log(response)
        const url = await response.json();
        window.location.replace(url)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }    
  }
  if (show) {return (
    <div className=' fixed inset-0 backdrop-blur-lg flex flex-col lg:justify-center md:justify-center mobile:z-10 mobile:mt-3 items-center'>
      <div className=' flex flex-col bg-zinc-950 rounded-2xl relative '>
        <button className=' absolute top-2 right-2 z-10  btn w-6 h-6' onClick={()=>{
          setIsShow(false)
        }}>X</button>
          <div className=' fade-mask-bottom'>
              <Image alt='' 
              src={'/b53942ff-cb02-4b08-918d-1843758a3cb8.jpg'} 
              width={450} 
              height={450}
              className=' rounded-2xl'
              />
          </div>
          <div className=' absolute top-44'>
            <h1 className=' flex items-center mx-2 text-xs text-gray-200'>
              <RiVerifiedBadgeFill className=' h-6 w-6 mx-1'/> 
              Help Spread The Word Of The Bible
            </h1>
            <h1 className=' flex items-center my-2 mx-2 text-xs text-gray-200'>
              <RiVerifiedBadgeFill className=' h-6 w-6 mx-1'/> 
              Take Part In Christian Charity Work
            </h1>
            <h1 className=' flex items-center text-xs mx-2 text-gray-200'>
              <RiVerifiedBadgeFill className=' h-6 w-6 mx-1'/> 
              Access To All Features
            </h1>
          </div>
          <div className=''>
            <h1 className=' text-center text-gray-300 text-xs'>Choose Plan</h1>
            <div className=' flex justify-between my-4'>
              <div onClick={()=>{setSelected('price_1PNl70K0RW804ljs9NlHYxoC')}} className={`${selected === 'price_1PNl70K0RW804ljs9NlHYxoC' ? 'bg-zinc-700' : 'bg-zinc-900'} cursor-pointer flex flex-col items-center ml-8  rounded-xl hover:bg-zinc-800`}>
                <div className=' p-4'>
                  <h1 className=' text-md font-semibold text-center'>$4.99</h1>
                  <h1 className=' text-md font-semibold'>Per Week</h1>
                  <h1 className=' text-xs mt-6'>$4.99 per week</h1>
                </div>
              </div>
              <div onClick={()=>{setSelected('price_1PNl70K0RW804ljsTzwBHAHo')}} className={`${selected === 'price_1PNl70K0RW804ljsTzwBHAHo' ? 'bg-zinc-700' : 'bg-zinc-900'} cursor-pointer flex flex-col items-center  rounded-xl hover:bg-zinc-800`}>
                <div className=' p-4'>
                  <h1 className=' text-md font-semibold text-center'>$12.99</h1>
                  <h1 className=' text-md font-semibold'>Per Month</h1>
                  <div className=' badge my-1 bg-zinc-950'>SAVE %40</div>
                  <h1 className=' text-xs '>$2.99 per week</h1>
                </div>
              </div>
                <div onClick={()=>{setSelected('price_1PNl70K0RW804ljsdujYNcEW')}} className={` ${selected === 'price_1PNl70K0RW804ljsdujYNcEW' ? 'bg-zinc-700' : 'bg-zinc-900'} cursor-pointer border-4 border-purple-700 flex flex-col items-center mr-7  rounded-xl hover:bg-zinc-800`}>
                  <div className=' p-4'>
                    <h1 className=' text-md font-semibold text-center'>$59.99</h1>
                    <h1 className=' text-md font-semibold text-center'>Per Year</h1>
                    <div className=' badge my-1 bg-zinc-950'>SAVE %77</div>
                    <h1 className=' text-xs text-center '>$1.15 per week</h1>
                  </div>
                </div>
            </div>
          </div>
          <div className=''>
            <h1 className=' text-xs text-center text-gray-300'>Cancel Anytime</h1>
            <h1 className=' text-xs text-center text-gray-300 mt-1'>No Risks, No Charges</h1>

          </div>
          <button onClick={checkout} className=' btn bg-purple-700 hover:bg-purple-800 m-4'>{ isLoading ? <div className=' loading loading-dots loading-sm'></div> : 'Try 3 Days Free'}</button>
      </div>
    </div>
  )} else {
    return;
  }
}
