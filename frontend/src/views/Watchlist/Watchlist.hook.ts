import {
    GetWatchlistMediasDocument, MediaDetails,
    Movie, TvShow, TvShowDetailsFragmentDoc,
    useGetWatchlistMediasLazyQuery,
    useMutateFavoriteMediaMutation,
    useMutateRateMediaMutation, useMutateWatchlistMediaMutation
} from "../../generated/graphql";
import {useState} from "react";
import {MediaEnum} from "../../interfaces/Media.interface";
import {gql} from "@apollo/client";
import {MutationUpdaterFunction} from "@apollo/client/core/types";

const GET_WATCHLIST_MEDIAS = gql`
    query GetWatchlistMedias($mediaType: String!, $accountId: Int!, $sessionId: String!,  $page: Int!) {
        watchlistMedias(mediaType: $mediaType, accountId: $accountId, sessionId: $sessionId, page: $page) {
            ... on Movie {
                id

            }

            ... on TvShow {
                id
            }
        }
    }`

export function useWatchlist() {
    const session: string = localStorage.getItem('user');
    const sessionId: string = JSON.parse(session).sessionId;
    const accountId: number = JSON.parse(session).id;

    console.info('rerender')
    const [getMediasWatchlist, {
        data: {watchlistMedias = []} = {},
        loading: loadingMediasWatchlist
    }] = useGetWatchlistMediasLazyQuery()
    const [setRateMedia, {loading: loadingRate}] = useMutateRateMediaMutation();
    const [setFavoriteMedia, {loading: loadingFavorite}] = useMutateFavoriteMediaMutation();
    const [setWatchlistMedia, {loading: loadingWatchlisted}] = useMutateWatchlistMediaMutation();

    const [watchlistMode, setWatchlistMode] = useState(MediaEnum.Movie);


    const deleteMediaFromWatchlist = (media: Movie | TvShow, isWatchlisted: boolean) => {
        setWatchlistMedia({
            update: (cache, {data: {watchlistMedia: mediaDeleted}}: any) => {
                updateWatchlistMediasQuery(cache, accountId, sessionId, mediaDeleted)
            },
            variables: {
                media: {
                    id: media.id,
                    type: media.type,
                    watchlist: isWatchlisted
                }, accountId: accountId, sessionId: sessionId
            }
        })
    }

    return {
        var:{
            session,
            sessionId,
            accountId
        },
        state: {
            watchlistMedias,
            loadingRate,
            loadingFavorite,
            loadingWatchlisted,
            watchlistMode
        },
        actions: {
            getMediasWatchlist,
            setFavoriteMedia,
            setRateMedia,
            setWatchlistMedia,
            setWatchlistMode,
            deleteMediaFromWatchlist
        },
    }
}

function updateWatchlistMediasQuery(cache: any, accountId: number, sessionId: string, mediaDeleted: Movie | TvShow) {
    cache.updateQuery({
            query: GetWatchlistMediasDocument,
            variables: {mediaType: 'movie', accountId: accountId, sessionId: sessionId, page: 1}
        },
        ({ watchlistMedias }: any) => {
            const indexToDelete = watchlistMedias.findIndex((mediaWatchlisted: MediaDetails) => mediaWatchlisted.id === mediaDeleted?.id)
            const newArr = [...watchlistMedias]
            newArr.splice(indexToDelete, 1)
            return {watchlistMedias: newArr}
        }
    )
}
