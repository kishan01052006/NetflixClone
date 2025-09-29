import { Link } from "react-router-dom"

const PopularMoviesPosters=(props)=>{
    const {value}=props
    return(
            <>
            {value?.results?.map((each)=>{
      return(
    <div className="slider-container flex ">
      
      <div>
        <Link to={`/movies/${each.id}`} key={each.id}>
        <img src={each.poster_path} className=" w-[255px] h-[275px]  m-8 "/>
        </Link>
      </div>
      
    </div>
      )
    })}
            </>
    )
}
export default PopularMoviesPosters