import {Redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AppConstants} from "../../app.constants";
import {getRequestToken, getUser} from "../../helpers/MediaApiCalls";

 const Login = async () : Promise<any> =>  {
    return getRequestToken().then(
        (token) => {
            window.location.replace("https://www.themoviedb.org/authenticate/" + token + "?redirect_to=" + AppConstants.FRONT_URL + "/auth/session");
        });
}


 const Session = (props: any) => {
    //get query string params
     const params = new URLSearchParams(props.location.search);

     const [user, setUser] = useState({username: null});
     useEffect(() => {
         async function getUserInfos() {
             const userData = await getUser(params);
             await localStorage.setItem('user', JSON.stringify(userData));
             await setUser(userData);
         }

         getUserInfos().then(

         );
     }, []);

     if (user.username) {
         return <Redirect to='/'/>;
     } else {
         return <div style={{color:'white'}}>loading</div>
     }

     //call backend
}
export {Login, Session}