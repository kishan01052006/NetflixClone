import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Loader from "../loader";

// ✅ FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const JWT_TOKEN = Cookies.get("jwt_token");

const BannerCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ Track favourite movies using their ID
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const fetchBannerMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://apis.ccbp.in/movies-app/trending-movies", {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results || []);
      } else {
        console.error("Failed to fetch banner movies");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[605px] bg-black">
        <Loader />
      </div>
    );
  }

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
              <h1 className="text-white text-4xl font-bold mb-4 flex items-center gap-4">
                {movie.title}

                {/* ✅ Heart Button */}
                
              </h1>

              <p className="text-white text-lg max-w-xl mb-6">
                {movie.overview?.length > 150
                  ? movie.overview.substring(0, 150) + "..."
                  : movie.overview}
              </p>
                  <div className="flex">
              <Link to={`/movies/${movie.id}`}>
              
                <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 transition w-[170px] cursor-pointer">
                  Play
                </button>
              </Link>
              <button
                  onClick={() => toggleFavourite(movie.id)}
                  className="text-3xl cursor-pointer bg-transparent border-none ml-5"
                >
                  <FontAwesomeIcon
                    icon={favourites.includes(movie.id) ? solidHeart : regularHeart}
                    style={{ color: favourites.includes(movie.id) ? "red" : "white" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
