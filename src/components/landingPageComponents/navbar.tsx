import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className=' flex justify-between m-4'>
        <Image alt='' src={'/v2_white_with_transparent_background (1).png'} height={200} width={200}/>

        <div>
          <Link href={'/auth/login'}>
            <button className=' btn'>Login</button>
          </Link>
        </div>
    </div>
  )
}
