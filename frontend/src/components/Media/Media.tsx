import React from "react";
import './Media.scss';
import {useHistory} from "react-router-dom";
import {MovieInterface} from "../../interfaces/Movie.interface";
import {TvShowInterface} from "../../interfaces/TvShow.interface";
import Skeleton from "../Skeleton/Skeleton";
import Actions from "../Actions/Actions";

interface Props {
    media?: MovieInterface | TvShowInterface;
    getTheme?: any;
    hasActions?: boolean;
    className?: string;
}


function Media(props: Props) {
    const history = useHistory();
    /**
     * Redirect to media details page
     */
    const goToMediaDetailsPage = ((media?: MovieInterface | TvShowInterface) => {
        history.push (`/${media?.type}/${media?.id}`);
    });

    let classes = "media";

    props.className && (classes += " " + props.className);
    // @ts-ignore
    return (

        <div className={classes}>
            {props.media ? (
                    <div className="poster-wrapper" onClick={() => goToMediaDetailsPage(props?.media)}>
                        <img className="poster"
                             crossOrigin="anonymous"
                             src={props.media.poster}
                             alt={props.media.title}/>
                        <div className="global-note">{props.media.voteAverage}</div>
                        {props.hasActions && <Actions media={props.media}/>}
                    </div>) :
                (<Skeleton/>)
            }
        </div>
    );
}

export default Media;