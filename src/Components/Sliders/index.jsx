import { Link } from "react-router-dom";
import Slider from "react-slick";
const Slide=(props)=>{
    const {data}=props
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
         
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    
      <Slider {...settings}>
       {data?.results?.map((each)=>{
      return(
    <div className="slider-container ml-10 mr-10">
        <Link to={`/movies/${each.id}`} reloadDocument  key={each.id}>
        <img src={each.poster_path} className="w-[284px]"/>
        </Link>
      
      
    </div>
      )
    })}
        
      </Slider>
   
  );
}

export default Slide