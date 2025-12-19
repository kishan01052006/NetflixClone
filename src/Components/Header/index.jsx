import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
const Header=()=>{
   const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const toggleSearch = () => {
    setShowSearch((prev) => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`)
      setShowSearch(false) // Hide search input after submission
      setQuery("") // Clear the query
    }
  }
    return (
    <div className="bg-[#000000] flex justify-between w-screen items-center p-3 px-5">
      <Link to="/" reloadDocument>
        <h1 className=" text-4xl font-extrabold text-red-600">MOVIES</h1>
      </Link>
      <div className="flex justify-between w-[15%] m-0">
        <Link to="/" reloadDocument><h3 className="text-white mr-25">Home</h3></Link>
        <Link to="/popular" reloadDocument><h3 className="text-white  mr-25">Popular</h3></Link>
        <Link to="/favourites" reloadDocument><h3 className="text-white mr-15">Favouites</h3></Link>
      </div>
      <div className="flex items-center gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <div className="relative flex items-center">
            {showSearch && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 w-[200px]"
                autoFocus
              />
            )}
            <button
              type={showSearch ? "submit" : "button"}
              onClick={!showSearch ? toggleSearch : undefined}
              className="ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <Link to="/profile" reloadDocument>
        <img
          src="https://res.cloudinary.com/dvbmbe4cl/image/upload/v1758621716/Avatar_iwrdyl.png"
          className="w-[35px]"
        /></Link>
      </div>
    </div>
  )
}
export default Header