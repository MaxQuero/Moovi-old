import {
    useGetLatestMediasLazyQuery,
    useGetOnTheAirMediasLazyQuery,
    useGetPopularMediasLazyQuery,
    useGetTrendingMediasLazyQuery,
    useSearchMediasLazyQuery
} from "../../generated/graphql";
import {useState} from "react";
import {MediaEnum} from "../../interfaces/Media.interface";

export function useMedias(mediaType: MediaEnum) {
    const session: string | null = localStorage.getItem('user');
    const sessionId: string = session && JSON.parse(session).sessionId;
    const [getTrendingMedias, {
        data: { trendingMedias = []} = {},
        loading: loadingTrendingMedias
    }] = useGetTrendingMediasLazyQuery()
    const [getPopularMedias, {
        data: { popularMedias = []} = {},
        loading: loadingPopularMedias
    }] = useGetPopularMediasLazyQuery()
    const [getOnTheAirMedias, {
        data: { onTheAirMedias= []} = {},
        loading: loadingOnTheAirMedias
    }] = useGetOnTheAirMediasLazyQuery()
    const [getLatestMedias, {
        data: { latestMedias = []} = {},
        loading: loadingLatestMedias
    }] = useGetLatestMediasLazyQuery()
    const [getSearchResults, {
        data: {searchResults = []} = {},
        loading: loadingSearchResults
    }] = useSearchMediasLazyQuery()

    const onTheAirLabel = (mediaType === MediaEnum.Movie) ? 'Actuellement au cinéma' : 'Dernières sorties';

    return {
        var: {
            session,
            sessionId,
            onTheAirLabel
        },
        state: {
            searchResults,
            popularMedias,
            loadingPopularMedias,
            loadingSearchResults,
            trendingMedias,
            loadingTrendingMedias,
            onTheAirMedias,
            loadingOnTheAirMedias,
            latestMedias,
            loadingLatestMedias,
        },
        actions: {
            getSearchResults,
            getOnTheAirMedias,
            getPopularMedias,
            getTrendingMedias,
            getLatestMedias
        }
    }
}
