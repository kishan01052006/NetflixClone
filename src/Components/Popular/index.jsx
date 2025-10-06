import Header from "../Header";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PopularMoviesPosters from "../PopularMoviesPosters";
import Loader from "../loader";

const JWT_TOKEN = Cookies.get("jwt_token");

const PopularPage = () => {
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiCall = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://apis.ccbp.in/movies-app/popular-movies", {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentData(data);
      } else {
        console.error("Failed to fetch popular movies");
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="w-full bg-[#000000] flex flex-wrap justify-center p-5">
        <PopularMoviesPosters value={currentData} />
      </div>

      <div className="bg-[#000000] py-6 mt-auto border-t">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-4 text-gray-600">
            <a href="https://www.google.com" target="_blank" className="hover:text-blue-600 transition">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" className="hover:text-red-600">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="text-gray-500 text-[15px]">Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
