import BibleChat from '@/components/bibleChat'
import React from 'react'

export default function Page() {
    const intialMessage = `Welcome to the Creation chat! 🌍✨ Let's explore the wonders of God's creation together. The Bible says in Genesis 1:1, "In the beginning, God created the heavens and the earth." Feel free to ask me anything about the creation story, the beauty of nature, and God's incredible work in making the universe.`


  return (
    <div className=' flex h-screen justify-center items-center'>
        <BibleChat type='Creation' api='/api/chat/creation' initalMessage={intialMessage}/> 
    </div>
  )
}
