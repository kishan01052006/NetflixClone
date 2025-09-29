import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(67, 104, 235, 0.8), rgba(164, 184, 255, 0)), url(https://res.cloudinary.com/dvbmbe4cl/image/upload/v1758893995/93955cfc4c28572ced55c420bbcd234b14c68813_wi931k.jpg)`,
      }}
    >
      <h1 className="font-bold text-[96px] text-white">Lost Your Way ?</h1>
      <p className="mt-5 text-white text-center px-4">
        We are sorry, the page you requested could not be found.  
        Please go back to the homepage.
      </p>
      <Link to="/">
        <button className="mt-8 text-black bg-white h-[45px] w-[110px] rounded-lg cursor-pointer">
          Go to Home
        </button>
      </Link>
    </div>
  )
}

export default PageNotFound
