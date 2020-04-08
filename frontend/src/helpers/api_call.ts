import {AppConstants} from "../app.constants";

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

    return callUrl(urlSession,
    {
            method: 'POST',
            body: JSON.stringify({'request_token': requestToken}),
            headers: {'Content-type': 'application/json'}
        }).then(
            (res) => {
                return res;
            }
    );
}
export async function callUrl(url: string, options?: any): Promise<any> {
    return  fetch(url, options).then(
        (response) => {
            return response.json()
        }
    ).then(
        (json) => {
            return json;
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    );
}