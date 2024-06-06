import React from 'react'
import FiveStars from '../fivestars'
const testimonials :any = [
    {
      quote:
        "I used this to prank some of my friends, i have never laughed harder.",
      name: "Tanay Tondare",
      occupation: 'CEO at Precision Labs',
      profilePic: '/431902287_368223219446992_2525287226774476385_n.jpg'

    },
    {
      quote:
        "We used this app to prank many of our subscribers and got some hilarous reactions.",
      name: "Nelk",
      occupation: 'Youtuber',
      profilePic: '/139829295_485163762474597_3857552590533108128_n.jpg'
  
    },
    {
      quote: "You can get some really funny reactions with this prank calling app, Highly reccomend this app.",
      name: "",
      occupation: '',
      profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'
  
    },
    {
        quote:
        "I was Pranked! Using this app, it was really funny. I later went on and used this app to prank some of my friends. It is the best decision i have ever made in my life. YOU WILL NOT REGRET USING THIS APP!",
      name: "Jesse",
      occupation: 'The Bloke That Got Pranked In The Video',
      profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'

  
    },
    {
      quote:
        "Voices are super realistic, your pranks will not sound like AI",
      name: "",
      occupation: '',
      profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'

  
    },
    {
        quote:
          "Really funny prank calls, fully customizable promtps. I had a blast using this app.",
        name: "",
        occupation: '',
        profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'
  
    
      },
  
  ];

const ReviewCard = ({name, quote, occupation, profilePic, idx} : any)=>{
    return (            
    <div    
        className=" w-[350px] bg-zinc-950 rounded-2xl "
      >
        <div className=" m-4">
        <FiveStars/>
        <p className=" text-gray-300 text-xs mt-3">{quote}</p>
          <div className=" flex items- mt-3">
              <img
              src={profilePic}
              alt={`Thumbnail ${idx + 1}`}
              className=" w-[40px] h-[40px] rounded-3xl shadow-sm"
          />
          <div className=" ml-2">
            <p className=" text-xs ">{name}</p>
            <p className=" text-white text-xs">{occupation}</p>
          </div>

          </div>
          </div>

      </div>
      )
}

export default function Reviews() {
  return (
    <div className=' flex justify-center'>
        <div className=' grid grid-cols-2 gap-4'>
        {testimonials.map((review : any, idx : number) => (
            <ReviewCard key={idx} name={review.name} quote={review.quote}
            occupation={review.occupation} profilePic={review.profilePic} idx={idx} />
          ))}
        </div>
    </div>
  )
}
