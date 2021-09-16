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

    console.log('will call url');
    return callUrl(urlSession,
    {
            method: 'POST',
            body: JSON.stringify({'request_token': requestToken}),
            headers: {'Content-type': 'application/json'}
        }).then(
            (res) => {
                console.log('get user then', res);
                return res;
            }
    );
}


export async function getUserRatings(accountId: string, sessionId: string): Promise<any>{
    const urlSession = `${AppConstants.BACK_URL}/user/${accountId}/ratings`;

    return callUrl(urlSession,
        {
            method: 'POST',
            body: JSON.stringify({
                sessionId: sessionId
            }),
            headers: {'Content-type': 'application/json'}
        }).then(
        (res) => {
            console.log('get user then', res);
            return res;
        }
    );
}

export async function getPopularMovies(sessionId: string): Promise<any> {
    const movieUrl = AppConstants.BACK_URL + '/movie/popular';
    return callUrl(movieUrl, {
        method: 'POST',
        body: JSON.stringify({
            sessionId: sessionId
        }),
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

export async function callUrl(url: string, options?: any): Promise<any> {
    return  fetch(url, options)
        .then(
            (response) => {
                if(response.ok)
                {
                    return response.json()
                }

                throw new Error('Something went wrong. Try to see if the server is well connected');
            }
        )
        .then(
            (json) => {
                return json;
            }
        ).catch(
            (err) => {
                console.error(err)
            }
        );
}