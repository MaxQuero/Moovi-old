import {AppConstants} from "../app.constants";
import {TvShowInterface} from "../interfaces/TvShow.interface";
import {MovieInterface} from "../interfaces/Movie.interface";
import {MediaEnum} from "../interfaces/Media.interface";
export async function getRequestToken(): Promise<any> {
    const urlToken = AppConstants.API_DEFAULT + '/authentication/token/new?api_key=' + AppConstants.API_KEY;

    return callUrl(urlToken).then(
        (res) => {
            return res.request_token;
        }
    );
}

export async function getUser(params: any): Promise<any>{
    const requestToken = params.get('request_token');
    const urlSession = AppConstants.BACK_URL + '/user/create';

    const res = await callUrl(urlSession,
    {
            method: 'POST',
            body: JSON.stringify({'request_token': requestToken}),
            headers: {'Content-type': 'application/json'}
        });
    console.log('get user then', res);
    return res;
}


export async function getUserRatings(mediaType: string, accountId: string, sessionId: string): Promise<any>{
    const urlSession = `${AppConstants.BACK_URL}/user/${accountId}/ratings`;

    const res = await callUrl(urlSession,
        {
            method: 'POST',
            body: JSON.stringify({
                sessionId: sessionId,
                mediaType: mediaType
            }),
            headers: {'Content-type': 'application/json'}
        });

    console.log('get user then', res);
    return res;
}

export async function getPopularMedias(mediaType: string): Promise<any> {
    const tvShowUrl = AppConstants.BACK_URL + '/media/popular';

        return await callUrl(tvShowUrl, {
            method: 'POST',
            body: JSON.stringify({
                mediaType: mediaType
            }),
            headers: {'Content-type': 'application/json'}
        });

}


export async function getOnTheAirMedias(mediaType: string): Promise<any> {

    const tvShowUrl = AppConstants.BACK_URL + '/media/on-the-air';
    return callUrl(tvShowUrl, {
        method: 'POST',
        body: JSON.stringify({
            mediaType: mediaType
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function getTrendingMedias(mediaType: MediaEnum): Promise<any> {

    const tvShowUrl = AppConstants.BACK_URL + '/media/trending';
    return callUrl(tvShowUrl, {
        method: 'POST',
        body: JSON.stringify({
            mediaType: mediaType
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function getUpcomingMedias(mediaType: string): Promise<any> {
    const tvShowUrl = AppConstants.BACK_URL + '/media/latest';
    return callUrl(tvShowUrl, {
        method: 'POST',
        body: JSON.stringify({
            mediaType: mediaType
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function getMediaDetailsFromId(mediaId: string, mediaType: MediaEnum, sessionId?: string): Promise<any> {
    const tvShowUrl = `${AppConstants.BACK_URL}/media/${mediaId}`;
    return callUrl(tvShowUrl, {
        method: 'POST',
        body: JSON.stringify({
            sessionId: sessionId,
            mediaType: mediaType
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function rateMedia(rating: number, media: MovieInterface | TvShowInterface, sessionId: string): Promise<any> {
    const rateTvShowUrl = `${AppConstants.BACK_URL}/media/${media.id}/rate`;
    try {
        return callUrl(rateTvShowUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    rating: rating,
                    sessionId: sessionId,
                    media: media
                }),
                headers: {'Content-type': 'application/json'}
            })
    }
    catch (err) {
        throw new Error('test');
    }

}

export async function favMedia(media: MovieInterface | TvShowInterface, isFavorite: boolean, accountId: number, sessionId: string): Promise<any> {
    const favTvShowUrl = `${AppConstants.BACK_URL}/media/${media.id}/favorite`;
    try {
        return callUrl(favTvShowUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    accountId: accountId,
                    sessionId: sessionId,
                    media: media,
                    isFavorite: isFavorite
                }),
                headers: {'Content-type': 'application/json'}
            })
    }
    catch (err) {
        throw new Error('Error when trying to fav the media');
    }
}

export async function setMediaToWatchlist(media: MovieInterface | TvShowInterface, isWatchlisted: boolean,  accountId: number, sessionId: string): Promise<any> {
    const setToWatchlistUrl = `${AppConstants.BACK_URL}/media/${media.id}/watchlist`;

    try {
        return callUrl(setToWatchlistUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    accountId: accountId,
                    sessionId: sessionId,
                    media: media,
                    isWatchlisted: isWatchlisted
                }),
                headers: {'Content-type': 'application/json'}
            })
    }
    catch (err) {
        throw new Error('Error when adding media to watchlist');
    }
}

export async function searchMedias(mediaType: string, query: string, page: number = 1): Promise<any>{
    const searchTvShowUrl = `${AppConstants.BACK_URL}/media/search`;
    return callUrl(searchTvShowUrl, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            page: page,
            mediaType: mediaType
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function getMediaWatchlist(mediaType: MediaEnum, accountId: number, sessionId: string, page:number = 1) {
    const tvShowWatchlistUrl = `${AppConstants.BACK_URL}/media/watchlist`;
    return callUrl(tvShowWatchlistUrl, {
        method: 'POST',
        body: JSON.stringify({
            accountId: accountId,
            sessionId: sessionId,
            mediaType: mediaType,
            page: page
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function callUrl(url: string, options?: any): Promise<any> {
    try {
        const res: any = await fetch(url, options);
        if(!res.ok) {
            throw new Error(res.statusText);
        }

        return res.json();
    } catch (err) {
        throw new Error(err.message);
    }
}