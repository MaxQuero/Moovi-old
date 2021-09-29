import {AppConstants} from "../app.constants";
import {MovieInterface} from "../components/Movie/Movie.interface";
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


export async function getUserRatings(accountId: string, sessionId: string): Promise<any>{
    const urlSession = `${AppConstants.BACK_URL}/user/${accountId}/ratings`;

    const res = await callUrl(urlSession,
        {
            method: 'POST',
            body: JSON.stringify({
                sessionId: sessionId
            }),
            headers: {'Content-type': 'application/json'}
        });

    console.log('get user then', res);
    return res;
}

export async function getPopularMovies(): Promise<any> {
    const movieUrl = AppConstants.BACK_URL + '/movie/popular';

        return await callUrl(movieUrl, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });

}


export async function getTheatresMovies(): Promise<any> {
    const movieUrl = AppConstants.BACK_URL + '/movie/in-theatres';
    return callUrl(movieUrl, {
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
}

export async function getTrendingMedias(): Promise<any> {
    const movieUrl = AppConstants.BACK_URL + '/movie/trending';
    return callUrl(movieUrl, {
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
}

export async function getUpcomingMovies(): Promise<any> {
    const movieUrl = AppConstants.BACK_URL + '/movie/upcoming';
    return callUrl(movieUrl, {
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    });
}

export async function getMovieDetailsFromId(movieId: string, sessionId?: string): Promise<any> {
    const movieUrl = `${AppConstants.BACK_URL}/movie/${movieId}`;
    return callUrl(movieUrl, {
        method: 'POST',
        body: JSON.stringify({
            sessionId: sessionId
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function rateMovie(rating: number, movie: MovieInterface, sessionId: string): Promise<any> {
    const rateMovieUrl = `${AppConstants.BACK_URL}/movie/${movie.id}/rate`;
    try {
        return callUrl(rateMovieUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    rating: rating,
                    sessionId: sessionId,
                    movie: movie
                }),
                headers: {'Content-type': 'application/json'}
            })
    }
    catch (err) {
        throw new Error('test');
    }

}

export async function favMovie(accountId: number, sessionId: string, movieType: string, movie: MovieInterface, isFavorite: boolean): Promise<any> {
    const favMovieUrl = `${AppConstants.BACK_URL}/movie/${movie.id}/favorite`;
    try {
        return callUrl(favMovieUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    accountId: accountId,
                    sessionId: sessionId,
                    movie: movie,
                    isFavorite: isFavorite
                }),
                headers: {'Content-type': 'application/json'}
            })
    }
    catch (err) {
        throw new Error('Error when tryingto fav the media');
    }
}

export async function setToWatchlist(accountId: number, sessionId: string, movieType: string, movie: MovieInterface, isWatchlisted: boolean): Promise<any> {
    const setToWatchlistUrl = `${AppConstants.BACK_URL}/movie/${movie.id}/watchlist`;

    try {
        return callUrl(setToWatchlistUrl,
            {
                method: 'POST',
                body: JSON.stringify({
                    accountId: accountId,
                    sessionId: sessionId,
                    media: movie,
                    mediaType: "movie",
                    isWatchlisted: isWatchlisted
                }),
                headers: {'Content-type': 'application/json'}
            })
    }
    catch (err) {
        throw new Error('Error when adding media to watchlist');
    }
}

export async function searchMovies(query: string, page: number = 1): Promise<any>{
    const searchMovieUrl = `${AppConstants.BACK_URL}/movie/search`;
    return callUrl(searchMovieUrl, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            page: page
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function getMovieWatchlist(accountId: number, sessionId: string, page:number = 1) {
    const movieWatchlistUrl = `${AppConstants.BACK_URL}/movie/watchlist`;
    return callUrl(movieWatchlistUrl, {
        method: 'POST',
        body: JSON.stringify({
            accountId: accountId,
            sessionId: sessionId,
            page: page
        }),
        headers: {'Content-type': 'application/json'}
    });
}

export async function getTvShowWatchlist(accountId: number, sessionId: string, page:number = 1) {
    const tvShowWatchlistUrl = `${AppConstants.BACK_URL}/tvshow/watchlist`;
    return callUrl(tvShowWatchlistUrl, {
        method: 'POST',
        body: JSON.stringify({
            accountId: accountId,
            sessionId: sessionId,
            page: page
        }),
        headers: {'Content-type': 'application/json'}
    });
}


export async function callUrl(url: string, options?: any): Promise<any> {

    try {
        const res: any = await fetch(url, options)
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    } catch (err) {
        console.log('messsage', err);
        throw new Error(err.message);
    }
}