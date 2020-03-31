import {Redirect} from "react-router";
import React from "react";
import {AppConstants} from "../../app.constants";
import {callUrl} from "../../helpers/api_call";

async function Login() : Promise<any> {
    const urlToken = AppConstants.API_DEFAULT + '/authentication/token/new?api_key=' + AppConstants.API_KEY;

    const tokenFi = await callUrl(urlToken).then(
        (res) => {
            console.log(res);
            return res.request_token
        }
    ).then(
        (token) => {

            getLogin(token).then(
                (res) => {
                    console.log(res);
                });

    })
}



async function getLogin(requestToken: any): Promise<any> {

    const urlLogin  = process.env.REACT_APP_SERVER_BASE_URL + '/user/login';
    const options = {method: 'POST',
        body: JSON.stringify({ token: requestToken }),
        headers: { 'Content-type': 'application/json' }
        };
    console.log('options', options);
    return new Promise<any>(
        resolve => callUrl(urlLogin, options).then(
            (res) => {
                resolve(res);
            }
        )
    );

}

export { Login }