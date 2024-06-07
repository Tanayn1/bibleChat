import React from 'react'
import FiveStars from '../fivestars'
import Marquee from '../magicui/marquee';
const testimonials :any = [
    {
      quote:
        "Absolutely love this app! It has brought me closer to the Word of God and strengthened my faith.",
      name: "Tanay Tondare",
      occupation: 'CEO at Precision Labs',
      profilePic: '/431902287_368223219446992_2525287226774476385_n.jpg'

    },
    {
      quote:
        "A must-have for every Christian! Holy Harmony has deepened my faith and provided answers to my spiritual questions instantly.",
      name: "",
      occupation: '',
      profilePic: '/139829295_485163762474597_3857552590533108128_n.jpg'
  
    },
    {
      quote: "This app is a blessing! I love how I can explore the Bible and find inspiration whenever I need it.",
      name: "",
      occupation: '',
      profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'
  
    },
    {
        quote:
        "Holy Harmony has made my daily devotions more meaningful. The instant scripture guidance is truly amazing!",
      name: "",
      occupation: '',
      profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'

  
    },
    {
      quote:
        "Holy Harmony is a game-changer for my spiritual growth. The easy access to biblical wisdom and the interactive features make it an essential part of my daily routine.",
      name: "",
      occupation: '',
      profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'

  
    },
    {
        quote:
          "An incredible tool for Bible study. It's like having a spiritual advisor in your pocket!",
        name: "",
        occupation: '',
        profilePic: '/44884218_345707102882519_2446069589734326272_n.jpg'
  
    
      },
  
  ];

const ReviewCard = ({name, quote, occupation, profilePic, idx} : any)=>{
    return (            
    <div  key={idx}  
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

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

export default function Reviews() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg  py-20 ">
    <Marquee pauseOnHover className="[--duration:20s]">
      {firstRow.map((review : any) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
    <Marquee reverse pauseOnHover className="[--duration:20s]">
      {secondRow.map((review : any) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Marquee>
  </div>
  )
}
