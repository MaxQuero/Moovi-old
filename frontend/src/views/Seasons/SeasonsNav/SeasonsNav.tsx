import Moment from "moment";
import React from "react";
import {v4 as uuidv4} from "uuid";
import {SeasonDetailsInterface} from "../../../interfaces/SeasonDetails.interface";
import './SeasonsNav.scss'
import unknown from "../../../assets/img/unknown.svg";
import ScrollbarHorizontal from "../../../components/ScrollbarHorizontal/ScrollbarHorizontal";

Moment.locale('fr');

type SeasonsNavProps = {
    seasons: SeasonDetailsInterface[],
    changeSeasonSelected: (seasonSelected: number) => void
}

function SeasonsNav({seasons, changeSeasonSelected}: SeasonsNavProps) {
    return (
        <div className="seasons-nav">
            <ScrollbarHorizontal>
            {seasons?.map((season: SeasonDetailsInterface) =>
                (
                    <span key={uuidv4()} role="presentation" className="seasons-nav__season" onClick={() =>
                        changeSeasonSelected(season.season_number)}
                    >
                        <img className="seasons-nav__season__thumbnail"
                             src={season.poster_path ? `https://www.themoviedb.org/t/p/original/${season.poster_path}` : unknown}
                             alt="season thumbnail"
                        />
                        <span className="seasons-nav__season__title">{season.name}</span>
                    </span>
                )
            )}
            </ScrollbarHorizontal>
        </div>
    )
}

export default SeasonsNav;