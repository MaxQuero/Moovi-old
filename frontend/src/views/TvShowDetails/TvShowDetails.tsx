import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import Backdrop from "../../components/Backdrop/Backdrop";
import "./TvShowDetails.scss";
import Moment from "moment";
import 'moment/locale/fr';
import Casting from "../../components/Casting/Casting";
import ScrollbarMedia from "../../components/ScrollbarMedia/ScrollbarMedia";
import {getMediaDetails} from "../../helpers/Helpers";
import {MediaEnum} from "../../interfaces/Media.interface";

Moment.locale('fr');

function TvShowDetails() {
    const dispatch = useDispatch();
    const params: any = useParams();
    const tvShowId = params.id;
    const tvShow = useSelector((state: any )=> state.mediasReducer.mediaDetails);

    useEffect(() => {
        const session: string | null = localStorage.getItem('user');
        if (session) {
            const sessionId: string = JSON.parse(session).sessionId;
            dispatch(getMediaDetails(tvShowId, MediaEnum.Tv, sessionId));
        } else {
            dispatch(getMediaDetails(tvShowId, MediaEnum.Tv));
        }

    }, []);

    return (
        <>
            {
                tvShow && <div className="tvshow-details">
                    <Backdrop media={tvShow} />
                    <div className="tvshow-details__content">
                        <Casting cast={tvShow.actors} crew={tvShow.directors} />
                        <div className="tvshow-details__recommendations">
                            <span className="tvshow-details__recommendations__title"> Recommandations </span>
                            <ScrollbarMedia loading={tvShow.loading} medias={tvShow.recommendations} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default TvShowDetails;