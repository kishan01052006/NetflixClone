import Header from "../Header"
import Cookies from "js-cookie"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Details from "../MovieDetailed"

const JWT_TOKEN=Cookies.get("jwt_token")
const MovieDetils=()=>{
    const {movieId}=useParams()
    const [presentData,setCurrentData]=useState({})
    const ApiCall=async()=>{
        const response=await fetch(`https://apis.ccbp.in/movies-app/movies/${movieId}`,{
            headers:{
                Authorization:`Bearer ${JWT_TOKEN}`
            }
        })
       const data=await response.json()
        setCurrentData(data.movie_details)
        console.log(data)
       
    }
     
    useEffect(()=>{
        ApiCall()
        
    },[movieId])
    return(
        <div className="overflow-hidden">
          
            <Header/>
            
            <div className="w-full ">
                <Details vralue={presentData}/>
            </div>
            
            
            <div className="bg-black py-8 mt-auto border-t">
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
    )
}
export default MovieDetils