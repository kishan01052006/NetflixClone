import Header from "../Header";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import PopularMoviesPosters from "../PopularMoviesPosters";

const JWT_TOKEN = Cookies.get("jwt_token");

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[60vh] bg-black">
          <div
            className="w-16 h-16 border-8 border-gray-700 border-t-red-600 rounded-full animate-spin"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center h-[60vh] bg-black text-center px-4">
           <img
            src="https://res.cloudinary.com/dvbmbe4cl/image/upload/v1718615615/alert-triangle_wwztld.png"
            alt="error"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-white text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700 transition">
            Try Again
          </button>
        </div>
      );
    }

    if (!searchResults || searchResults.results.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-[60vh] bg-black text-center px-4">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no results"
            className="w-64 h-64 mb-4"
          />
          <h1 className="text-white text-2xl font-bold mb-2">No Search Results Found</h1>
          <p className="text-gray-400 text-lg">Try different keywords or search again</p>
        </div>
      );
    }

    return (
      <div className="w-full bg-[#000000] p-5 md:p-10">
         <h2 className="text-white text-2xl font-semibold mb-6 px-2">Search Results for: <span className="text-red-500">"{query}"</span></h2>
        <div className="flex flex-wrap justify-center gap-4">
          <PopularMoviesPosters value={searchResults} />
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        {renderContent()}
      </div>
      <div className="bg-[#000000] py-6 mt-auto border-t border-gray-800">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-4 text-gray-600">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition"><i className="fab fa-google"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 "><i className="fab fa-youtube"></i></a>
          </div>
          <p className="text-gray-500 text-[15px]">Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;