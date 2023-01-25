import {MediaEnum} from "../interfaces/Media.interface";
import {
    useGetMediaDetailsQuery, useGetSeasonDetailsLazyQuery,
} from "../generated/graphql";

export function useMediaDetails(mediaId: number, mediaType: MediaEnum, sessionId: string) {
    const { data, loading, error } = useGetMediaDetailsQuery({ variables: {mediaId: mediaId, mediaType: mediaType, sessionId: sessionId}})
    return{ data: data?.mediaDetails , loading, error}
}

export function useSeasonDetails() {
    const [ getSeasonDetails, { data, loading, error } ]= useGetSeasonDetailsLazyQuery()

    return{
        actions: { getSeasonDetails },
        state : {
            data: data?.seasonDetails,
            loading,
            error
        }
    }
}