import React from 'react';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.scss';
import Skeleton from '../Skeleton/Skeleton';
import { MediaEnum } from '../../interfaces/Media.interface';
import { useNavigate } from 'react-router-dom';
import {Movie, TvShow} from "../../generated/graphql";
interface Props {
  medias: any;
  loading: boolean;
}

const Carousel = (props: Props) => {
  const navigate = useNavigate()
  /**
   * Redirect to movie details page
   */
  const goToMovieDetailsPage = (mediaType: MediaEnum, movieId: number) => {
    navigate(`/${mediaType}/${movieId}`);
  };

  const settings = {
    infinite: true,
    centerMode: true,
    speed: 500,
    centerPadding: '180px',
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'center',
  };
  const emptyMedias = Array.from(Array(6).keys());
  return (
    <div className="carousel">
      <Slider {...settings}>
        {!props.loading && props.medias?.length > 0
          ? props.medias?.map((media: TvShow | Movie) => (
              <div
                key={uuidv4()}
                role="presentation"
                className="carousel__item"
                onClick={() => goToMovieDetailsPage(media.type, media.id)}
              >
                <div className="carousel__item__content" style={{ backgroundImage: `url(${media.backdropCover}` }}>
                  {media?.logo?.filePath ? (
                    <img
                      className="carousel__item__logo"
                      alt="Carousel logo"
                      src={'https://www.themoviedb.org/t/p/w500/' + media?.logo?.filePath}
                    />
                  ) : (
                    <span className="carousel__item__logo carousel__item__logo--replacement">{media.title} </span>
                  )}
                </div>
              </div>
            ))
          : emptyMedias.map(() => (
              <div key={uuidv4()} className="carousel__skeleton">
                <Skeleton />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default Carousel;
