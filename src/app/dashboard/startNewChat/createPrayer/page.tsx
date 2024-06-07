import BibleChat from '@/components/bibleChat'
import React from 'react'

export default function Page() {    
    const intialMessage = `Welcome to the Create My Prayer chat. 🙏📝 I'm here to help you craft heartfelt prayers and connect with God. Philippians 4:6 encourages us, "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." Let me assist you in creating a prayer that expresses your deepest thoughts and feelings.`

  return (
    <div className=' flex h-screen justify-center items-center'>
        <BibleChat type='Create My Prayer' api='/api/chat/createPrayer' initalMessage={intialMessage}/> 
    </div>
  )
}
