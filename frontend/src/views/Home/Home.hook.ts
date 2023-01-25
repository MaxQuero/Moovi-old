import {
    useGetLatestMediasLazyQuery,
    useGetOnTheAirMediasLazyQuery,
    useGetPopularMediasLazyQuery,
    useGetTrendingMediasLazyQuery, useSearchMediasLazyQuery
} from "../../generated/graphql";
import {useState} from "react";
import {MediaEnum} from "../../interfaces/Media.interface";

export function useHome() {
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

    const [trendingMediasFiltered, setTrendingMediasFiltered] = useState(MediaEnum.Movie);
    const [onTheAirMediasFiltered, setOnTheAirMediasFiltered] = useState(MediaEnum.Movie);
    const [latestMediasFiltered, setLatestMediasFiltered] = useState(MediaEnum.Movie);

    return {
        var: { session, sessionId},
        state: {popularMedias, latestMedias, onTheAirMedias, trendingMedias, searchResults, loadingPopularMedias, loadingTrendingMedias, loadingLatestMedias, loadingOnTheAirMedias},
        actions: {getPopularMedias, getTrendingMedias, getLatestMedias, getOnTheAirMedias, getSearchResults}
    }
}