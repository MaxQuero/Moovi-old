import Moment from "moment";
import React from "react";
import {SeasonDetailsInterface} from "../../interfaces/SeasonDetails.interface";
import SeasonsNav from "./SeasonsNav/SeasonsNav";
import SeasonDetails from "./SeasonDetails/SeasonDetails";

Moment.locale('fr');

type SeasonsProps = {
    seasons: SeasonDetailsInterface[]
    seasonSelected: SeasonDetailsInterface
    changeSeasonSelected: any
}

function Seasons({ seasons, seasonSelected, changeSeasonSelected } : SeasonsProps) {
    return (
    <div className="seasons">
        <SeasonsNav seasons={seasons} changeSeasonSelected={changeSeasonSelected} />
        <SeasonDetails season={seasonSelected} />
    </div>
    )
}

export default Seasons;