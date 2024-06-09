import BibleChat from '@/components/bibleChat'
import React from 'react'

export default function Page() {    
    const intialMessage = `Welcome to the Relationships chat. 🤝❤️ I'm here to provide biblical guidance and wisdom on all aspects of relationships, whether it's friendships, family, or romantic partnerships. Proverbs 17:17 reminds us, "A friend loves at all times, and a brother is born for a time of adversity." Let's explore how we can build and nurture healthy, loving relationships based on the teachings of the Bible. Feel free to share your questions or concerns.`
  return (
    <div className=' flex h-screen justify-center items-center'>
        <BibleChat type='Relationships' api='/api/chat/relationships' initalMessage={intialMessage}/> 
    </div>
  )
}