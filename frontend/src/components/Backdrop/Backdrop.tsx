import Actions from "../Actions/Actions";
import React, {useState} from "react";
import Moment from "moment";
import {MovieInterface} from "../Movie/Movie.interface";
// @ts-ignore
import ColorThief from "colorthief";
import "./Backdrop.scss";
import {v4 as uuidv4} from "uuid";

interface Props {
    movie: MovieInterface;
}

function Backdrop(props: Props) {
    const [themeColor, setThemeColor]: any = useState();
    const [cssVar, setCssVar] = useState();
    const imgRef: any = React.createRef();

    const setTheme = () => {
        const colorThief = new ColorThief();
        const img = imgRef.current;
        const rgba = colorThief.getColor(img, 25);
        setThemeColor([...rgba, 0.8]);
        setCssVar({"--theme-color": `rgba(${[...rgba, 0.8]})` });
    }

    const formatDate: any = (date: any, format: string) => {
        return (Moment(date).format(format));
    };
    return (
        <div className="backdrop" style={{backgroundImage: `url(${props.movie.backdropCover}`}}>
            <div className="backdrop__overlay" style={cssVar}/>
            <div className="backdrop__content">
                <img className="backdrop__poster"
                     ref={imgRef}
                     crossOrigin="anonymous"
                     src={props.movie.poster}
                     alt={props.movie.title}
                     onLoad={setTheme}/>
                <div className="backdrop__infos">
                    <div className="backdrop__rating">{props.movie.voteAverage}</div>
                    <p className="backdrop__title">{props.movie.title}
                        <span className="backdrop__release-year"> ({formatDate(props.movie.releaseDate, 'YYYY')})</span>
                    </p>
                    <p className="backdrop__subtitle">
                        <span className="backdrop__release-date"> {formatDate(props.movie.releaseDate, "DD/MM/YYYY")}</span>
                        <span className="backdrop__genres">
                            { props.movie.genres.map((genre: { id: string, name: string }, i:number, arr: any) =>
                                <span key={uuidv4()} className="backdrop__genres__item">{genre.name}{i+1 !== arr.length && ', '}  </span>
                            ) }
                        </span>
                        <span className="backdrop__runtime">{props.movie.runtime} min</span>
                    </p>
                    <div className="backdrop__distribution">
                        <p className="backdrop__directors">De {props.movie.directors.map((director: any) =>
                            director.name )
                        }</p>
                        <p className="backdrop__actors">Avec {props.movie.actors.slice(0,3).map((actor: any, i, arr) =>
                          actor.name + (i+1 !== arr.length && ', ' ))
                        }</p>


                    </div>

                    <p className="backdrop__tagline">{props.movie.tagline}</p>

                    <Actions movie={props.movie} />

                    <div className="backdrop__synopsis">
                        <p className="backdrop__synopsis__title">Synopsis</p>
                        <p className="backdrop__synopsis__content">{props.movie.synopsis}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Backdrop;