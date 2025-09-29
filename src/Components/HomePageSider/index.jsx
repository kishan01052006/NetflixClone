import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const JWT_TOKEN = Cookies.get("jwt_token");

const BannerCarousel = () => {
  const [movies, setMovies] = useState([]);

  const fetchBannerMovies = async () => {
    const response = await fetch("https://apis.ccbp.in/movies-app/trending-movies", {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    const data = await response.json();
    setMovies(data.results || []);
  };

  useEffect(() => {
    fetchBannerMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-screen h-[605px] relative">
      <Slider {...settings} className="h-full">
        {movies.map((movie) => (
          
          <div key={movie.id} className="h-[605px] relative">
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-[605px] bg-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center pt-70 pl-30">
              <h1 className="text-white text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-white text-lg max-w-xl mb-6">
                {movie.overview?.length > 150
                  ? movie.overview.substring(0, 150) + "..."
                  : movie.overview}
              </p>
              <Link to={`/movies/${movie.id}`} key={movie.id}>
              <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 transition w-[170px] cursor-pointer">
                Play
              </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
