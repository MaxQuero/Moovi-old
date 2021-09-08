import {AppConstants} from "../app.constants";
import {MovieInterface} from "../components/Movie/movie.interface";

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

export async function getMovies(): Promise<any> {
    const movieUrl = AppConstants.BACK_URL + '/movie/list';
    return callUrl(movieUrl);
}

export async function rateMovie(movie: MovieInterface, note: number, sessionId: string): Promise<any> {
    const rateMovieUrl = AppConstants.BACK_URL + '/movie/rate';
    return callUrl(rateMovieUrl,
        {
            method: 'POST',
            body: JSON.stringify({
                movie: movie,
                note: note,
                sessionId: sessionId
            }),
            headers: {'Content-type': 'application/json'}
    })
}

export async function callUrl(url: string, options?: any): Promise<any> {
    return  fetch(url, options).then(
        (response) => {
            console.log('fetch then', response);
            return response.json()
        }
    ).then(
        (json) => {
            console.log('fetch rethen', json);

            return json;
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    );
}