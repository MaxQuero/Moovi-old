import Moment from "moment";
import React from "react";
import './SeasonDetails.scss'
import {EpisodeDetailsInterface} from "../../../interfaces/EpisodeDetailsInterface.interface";
import EpisodeDetails from "../EpisodeDetails/EpisodeDetails";
import {SeasonDetailsInterface} from "../../../interfaces/SeasonDetails.interface";

Moment.locale('fr');

type SeasonDetailsProps = {
    season: SeasonDetailsInterface
}

function SeasonDetails({ season } : SeasonDetailsProps) {
    return (
        (<div className="season-details">
            <span className="season-details__overview">{season?.overview}</span>
            <div className="season-details__episodes">
                {
                    season?.episodes?.map((episode: EpisodeDetailsInterface) => (
                        <>
                            <EpisodeDetails episode={episode} />
                            <hr />
                        </>
                    ))
                }
            </div>
        </div>)
    )
}

export default SeasonDetails;