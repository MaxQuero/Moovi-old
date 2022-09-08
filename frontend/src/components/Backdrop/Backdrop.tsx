import Actions from "../Actions/Actions";
import React, {RefObject, useState} from "react";
// @ts-ignore
import ColorThief from "colorthief";
import "./Backdrop.scss";
import {v4 as uuidv4} from "uuid";
import {formatDate} from "../../helpers/Helpers";
import {TvShowInterface} from "../../interfaces/TvShow.interface";
import {MovieInterface} from "../../interfaces/Movie.interface";

interface Props {
    media: MovieInterface | TvShowInterface;
    sessionId?: string;
}

function Backdrop(props: Props) {
    const [cssVar, setCssVar] = useState();
    const imgRef: RefObject<HTMLImageElement> = React.createRef();

    const setTheme = () => {
        const colorThief = new ColorThief();
        const img = imgRef.current;
        const rgba = colorThief.getColor(img, 25);
        setCssVar({"--theme-color": `rgba(${[...rgba, 0.8]})` });
    }

    return (
        <div className="backdrop" style={{backgroundImage: `url(${props.media.backdropCover}`}}>
            <div className="backdrop__overlay" style={cssVar}/>
            <div className="backdrop__content">
                <img className="backdrop__poster"
                     ref={imgRef}
                     crossOrigin="anonymous"
                     src={props.media.poster}
                     alt={props.media.title}
                     onLoad={setTheme}/>
                <div className="backdrop__infos">
                    <div className="backdrop__rating">
                        <span className="backdrop__rating__note">{props.media.voteAverage}</span>
                        <span className="backdrop__rating__number">{props.media.voteCount} votes</span>
                    </div>
                    <p className="backdrop__title">{props.media.title}
                        <span className="backdrop__release-year"> ({formatDate(props.media.releaseDate, 'YYYY')})</span>
                    </p>
                    <p className="backdrop__tagline">{props.media.tagline}</p>

                    <p className="backdrop__subtitle">
                        <span className="backdrop__release-date"> {formatDate(props.media.releaseDate, "DD/MM/YYYY")}</span>
                        <span className="backdrop__genres">
                            { props.media.genres.map((genre: { id: string, name: string }, i:number, arr: any) =>
                                <span key={uuidv4()} className="backdrop__genres__item">{genre.name}{i+1 !== arr.length && ', '}  </span>
                            ) }
                        </span>
                        <span className="backdrop__runtime">{props.media.runtime} min</span>
                    </p>
                    <div className="backdrop__distribution">
                        <p className="backdrop__directors">De {props.media.directors.map((director: any, i, arr) =>
                            director.name + (i+1 !== arr.length ? ', ' : ''))
                        }</p>
                        <p className="backdrop__actors">Avec {props.media.actors.slice(0,3).map((actor: any, i, arr) =>
                          actor.name + (i+1 !== arr.length ? ', ' : ''))
                        }</p>
                    </div>


                    <Actions media={props.media} />

                    <div className="backdrop__synopsis">
                        <p className="backdrop__synopsis__title">Synopsis</p>
                        <p className="backdrop__synopsis__content">{props.media.synopsis}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Backdrop;