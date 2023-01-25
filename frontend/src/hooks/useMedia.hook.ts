import {
    useGetLatestMediasLazyQuery,
    useGetOnTheAirMediasLazyQuery,
    useGetPopularMediasLazyQuery,
    useGetTrendingMediasLazyQuery, useSearchMediasLazyQuery
} from "../generated/graphql";

export function useMedia() {
    const session: string | null = localStorage.getItem('user');
    const sessionId: string = session && JSON.parse(session).sessionId;

    const [getTrendingMedias, {
        data: {trendingMedias = {}} = {},
        loading: loadingTrendingMedias
    }] = useGetTrendingMediasLazyQuery()
    const [getPopularMedias, {
        data: {popularMedias = {}} = {},
        loading: loadingPopularMedias
    }] = useGetPopularMediasLazyQuery()
    const [getOnTheAirMedias, {
        data: {onTheAirMedias = {}} = {},
        loading: loadingOnTheAirMedias
    }] = useGetOnTheAirMediasLazyQuery()
    const [getLatestMedias, {
        data: {latestMedias = {}} = {},
        loading: loadingLatestMedias
    }] = useGetLatestMediasLazyQuery()
    const [getSearchResults, {
        data: {searchResults = []} = {},
        loading: loadingSearchResults
    }] = useSearchMediasLazyQuery()

    return {
        data: {
            trendingMedias,
            popularMedias,
            onTheAirMedias,
            latestMedias,
            searchResults
        },
        var:  {
            session,
            sessionId,
            loadingTrendingMedias,
            loadingOnTheAirMedias,
            loadingPopularMedias,
            loadingSearchResults,
            loadingLatestMedias
        },
        actions: {
            getLatestMedias,
            getPopularMedias,
            getTrendingMedias,
            getSearchResults,
            getOnTheAirMedias,
        }
    }
}
