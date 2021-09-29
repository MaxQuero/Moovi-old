import React from "react";
import Slider from "react-slick";
import {v4 as uuid} from "uuid";
import {MovieInterface} from "../Movie/Movie.interface";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";
import {useHistory} from "react-router-dom";
interface Props {
    movies: MovieInterface[]
}



const Carousel = (props: Props) =>    {
    const history = useHistory();
    /**
     * Redirect to movie details page
     */
    const goToMovieDetailsPage = ((movieId: number) => {
        history.push (`/movie/${movieId}`);
    });


    const settings = {
        infinite: true,
        centerMode: true,
        speed: 500,
        centerPadding: "180px",
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "center",

    };
    return (
        <div className="carousel" >
            <Slider {...settings}>
                {props.movies.length > 0 && props.movies.map((movie: MovieInterface, i) => (
                    (
                        <div key={uuid()} className="carousel__item" onClick={() => goToMovieDetailsPage(movie.id)}>
                            <div className="carousel__item__content" style={{backgroundImage: `url(${movie.backdropCover}`}}>
                                { movie?.logo?.file_path ? (<img className="carousel__item__logo" src={"https://www.themoviedb.org/t/p/w500/" + movie?.logo?.file_path} />) : (<span className="carousel__item__logo carousel__item__logo--replacement">{ movie.title } </span>) }
                            </div>
                        </div>
                    )
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;