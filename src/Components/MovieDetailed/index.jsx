import { Link } from "react-router-dom";
import Loader from "../loader"; 

const Details = ({ value }) => {
  if (!value || Object.keys(value).length === 0) {
    return <Loader />;
  }

  const { backdrop_path, title, runtime, overview, adult, genres, budget, similar_movies } = value;

  return (
    <div>
      <div
        className="h-[605px] w-full bg-cover"
        style={{ backgroundImage: `url(${backdrop_path})` }}
      >
        <div className="inset-0 bg-gradient-to-r from-black/50 via-black/50 to-transparent flex flex-col justify-center pt-30 pl-30 h-[765px]">
          <h1 className="text-white text-4xl font-bold mb-6">{title}</h1>
          <p className="text-white text-lg max-w-xl mb-6">
            {overview?.length > 150 ? overview.substring(0, 150) + "..." : overview}
          </p>
          <div className="flex">
            <h4 className="text-[18px] text-white pb-5">{`${runtime} Minutes`}</h4>
            {adult ? (
              <h1 className="m-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-2 px-4 rounded shadow-lg inline-block">
                A
              </h1>
            ) : (
              <h1 className="ml-5 mb-5 text-center bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-2 px-4 rounded shadow-lg inline-block">
                U/A
              </h1>
            )}
          </div>

          <a
            href="https://www.netflix.com/in/"
            target="_blank"
            className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 transition w-[170px] cursor-pointer"
          >
            Play
          </a>
        </div>
      </div>

      <div className="flex mr-0">
        <div className="bg-[#000000] w-full pl-15 pt-5">
          <h1 className="text-[#94A3B8] mb-2">Generes</h1>
          {genres?.map((each) => (
            <h1 key={each.id} className="text-[#FFFFFF] text-[16px] mt-2">
              {each.name}
            </h1>
          ))}
        </div>

        <div className="bg-[#000000] w-full pl-15 pt-5">
          <h1 className="text-[#94A3B8] mb-2">Audio Available</h1>
          <h1 className="text-[#FFFFFF] text-[16px] mt-2">English</h1>
        </div>

        <div className="bg-[#000000] w-full pl-15 pt-5">
          <h1 className="text-[#94A3B8] mb-2">Budget</h1>
          <h1 className="text-[#FFFFFF] text-[16px] mt-2">{budget}</h1>
        </div>
      </div>

      <div className="bg-black pt-5 pl-13">
        <h1 className="text-[#FFFFFF] text-[16px] mt-2 font-HK Grotesk font-[600]">More Like This</h1>

        <div className="flex flex-wrap">
          {similar_movies?.map((each) => (
            <div className="m-4">
            <Link to={`/movies/${each.id}`} reloadDocument key={each.id}>
              <img
                src={each.backdrop_path}
                className="text-[#FFFFFF] text-[16px] w-[255px]"
                alt={each.title}
              />
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
