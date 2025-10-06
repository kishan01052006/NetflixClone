import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Loader";

const JWT_TOKEN = Cookies.get("jwt_token");

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(query)}`,
          {
            headers: { Authorization: `Bearer ${JWT_TOKEN}` },
          }
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300); // debounce
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for movies..."
        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <Loader />}
      {results.length > 0 && (
        <div className="absolute bg-black w-full mt-2 max-h-96 overflow-y-auto rounded-md shadow-lg z-50">
          {results.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded mr-3"
                />
                <p className="text-white">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
