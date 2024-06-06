import Banner1 from "@/components/landingPageComponents/banner1";
import Banner2 from "@/components/landingPageComponents/banner2";
import Banner3 from "@/components/landingPageComponents/banner3";
import Banner4 from "@/components/landingPageComponents/banner4";
import Footer from "@/components/landingPageComponents/footer";
import Hero from "@/components/landingPageComponents/hero";
import Navbar from "@/components/landingPageComponents/navbar";
import Reviews from "@/components/landingPageComponents/reviews";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      <Navbar/>
      <Hero/>
      <Banner1/>
      <Banner2/>
      <Banner3/>
      <Banner4/>
      <Reviews/>
      <Footer/>
    </div>
  );
}
