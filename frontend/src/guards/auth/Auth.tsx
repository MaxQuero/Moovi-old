import { useLocation } from "react-router";
import React, {useEffect, useState} from "react";
import {AppConstants} from "../../app.constants";
import {getRequestToken, getUser} from "../../helpers/api_call";
import userEvent from "@testing-library/user-event";

async function Login(): Promise<any> {
    return getRequestToken().then(
        (token) => {
            window.location.replace("https://www.themoviedb.org/authenticate/" + token + "?redirect_to=" + AppConstants.FRONT_URL + "/auth/session");
        });
}


 function Session() {
    //get query string params
     const params = new URLSearchParams(useLocation().search);
     console.log('ikkk');


     const [user, setUser] = useState(null);
     useEffect(() => {
         async function getUserInfos() {
             const user = await getUser(params);
             setUser(user);
         }

         getUserInfos().then(

         );
     }, []);



     //call backend
     return(
         <div>bonsoir {user}</div>
     )

}
export {Login, Session}