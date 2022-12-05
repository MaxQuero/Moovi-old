import Moment from 'moment';
import React, {useEffect, useState} from 'react';
import SeasonsNav from './SeasonsNav/SeasonsNav';
import SeasonDetails from './SeasonDetails/SeasonDetails';
import './Seasons.scss';
import {Maybe, Season, TvShow} from "../../generated/graphql";
import {useSeasonDetails} from "../../hooks/useMediaDetails.hook";
Moment.locale('fr');

type SeasonsProps = {
  media: TvShow;
  seasons?: Maybe<Season[]>;
};

function Seasons({ media, seasons }: SeasonsProps) {
    const {actions, state} = useSeasonDetails()
    const { getSeasonDetails } = actions
    const { data: seasonDetails, loading: loadingSeasonDetails } = state
    const session: string | null = localStorage.getItem('user');
    const sessionId: string = session && JSON.parse(session).sessionId;
    const [seasonSelected, setSeasonSelected] = useState<any>({} as Season);

    const changeSeasonSelected = async (seasonSelectedNumber: number) => {
        getSeasonDetails({ variables: {mediaId: media?.id, seasonNumber: seasonSelectedNumber, sessionId: sessionId} });
    };

    useEffect(() => {
        setSeasonSelected(seasonDetails);
    }, [seasonDetails])


    useEffect(() => {
        getSeasonDetails({ variables: {mediaId: media?.id, seasonNumber: 1, sessionId: sessionId} })
    }, [])

    return (
    <div className="seasons">
      <SeasonsNav
        seasons={seasons}
        seasonSelected={seasonSelected?.seasonNumber}
        changeSeasonSelected={seasonNumber => changeSeasonSelected(seasonNumber)}
      />
      <SeasonDetails media={media} season={seasonSelected} />
    </div>
  );
}

export default Seasons;
