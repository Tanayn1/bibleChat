'use client'
import SelectTier from '@/components/selectTier';
import SingleChoiceQuiz from '@/components/singleChoiceQuiz'
import React, { useState } from 'react'

export default function Page() {
  const [tier, setTier] = useState<null | string>(null);

  return (
    <div>
        { tier !== null ? <SingleChoiceQuiz diff={tier}/> : <SelectTier setDiff={(diff : string)=>{setTier(diff)}}/>}
    </div>
  )
}

