import BibleChat from '@/components/bibleChat'
import React from 'react'

export default function Page() {
    const intialMessage = `Welcome to the Heal My Pain chat. 🙏💖 I'm here to provide comfort and guidance through the words of the Bible. One of the verses that offer hope in times of pain is Psalm 147:3, "He heals the brokenhearted and binds up their wounds." Please share what's on your heart, and let's find solace and healing through scripture together.`

  return (
    <div className=' flex h-screen justify-center items-center'>
        <BibleChat api='/api/chat/healMyPain' initalMessage={intialMessage}/> 
    </div>
  )
}
