import Header from "../Header"
import React, { Component } from "react";
import Slider from "react-slick";
import Cookies from "js-cookie";
import { useState,useEffect } from "react";
import SimpleSlider from "../HomePageSider";
import Slide from "../Sliders";
import BannerCarousel from "../HomePageSider";
const JWT_TOKEN=Cookies.get("jwt_token")
const HomePage=()=>{
    const [currentData,setData]=useState(null)
    const [originalsData,setOriginalsData]=useState(null)
    
    const Apicall=async()=>{
    
    const response= await fetch("https://apis.ccbp.in/movies-app/trending-movies",{
         headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          }
    
    })

    const data=await response.json()
    setData(data)
          console.log(data)
}
    const ApiCallForOriginals=async()=>{
        
        const res=await fetch("https://apis.ccbp.in/movies-app/originals",{
            headers:{
                Authorization:`Bearer ${JWT_TOKEN}`,
            }
        })
        const net=await res.json()
        setOriginalsData(net)
        console.log(net)
    }

useEffect(()=>{
    Apicall()
    ApiCallForOriginals()
  },[])

     return(
        <div className="overflow-hidden">
        <div className="relative ">
        <Header />
        <BannerCarousel />
      </div>
        <div className="bg-[#000000]   w-screen">
            <div className="pl-12 pt-10 mb-0">
                <h1 className="text-white text-[24px] font-bold font-HK Grotesk mb-8">Trending Now</h1>
                <div className="">
                    <Slide data={currentData}/>
                </div>
            </div>
            <div className="p-12">
                <h1 className="text-white text-[24px] font-bold font-HK Grotesk mb-15">Originals</h1>
                <Slide data={originalsData}/>
                
            </div>
            <div className=" py-6 mt-auto border-t">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-4 text-gray-600">
             <a
        href="https://www.google.com"
        target="_blank"
        className="hover:text-blue-600 transition"
      >
        <i className="fab fa-google"></i>
      </a>
            <a
        href="https://twitter.com"
        target="_blank"
        className="hover:text-blue-400 transition"
      >
        <i className="fab fa-twitter"></i>
      </a>
            <a
        href="https://instagram.com"
        target="_blank"
  
        className="hover:text-pink-500 transition"
      >
        <i className="fab fa-instagram"></i>
      </a>
           <a
        href="https://youtube.com"
        target="_blank"
        className="hover:text-red-600 "
      >
        <i className="fab fa-youtube"></i>
      </a>
          </div>
          <p className="text-gray-500 text-[15px]">Contact Us</p>
        </div>
      </div>
        </div>
        
        
       
        </div>
    )
}
export default HomePage