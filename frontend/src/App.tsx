import React, {useEffect, useState} from 'react';
import Home from './views/Home/Home';
import Header from "./components/Header/Header";
import {Session} from "./guards/Auth/Auth";
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import MovieDetails from "./views/MovieDetails/MovieDetails";
import "./App.scss";
import Watchlist from "./views/Watchlist/Watchlist";
import TvShowDetails from "./views/TvShowDetails/TvShowDetails";
import TvShows from "./views/TvShows/TvShows";
import Movies from "./views/Movies/Movies";
import { matchPath } from "react-router";
import { createBrowserHistory } from 'history';


function App(): JSX.Element {
    const history = createBrowserHistory();

    const Content = () => {

        const location = useLocation();

        const [isMatched, setIsMatched]: [any, any] = useState(null);
        let match, match2;
        React.useEffect(() => {
             match = matchPath(location.pathname, {
                path: "/movie/:id",
                exact: true,
                strict: false
            });

            match2 = matchPath(location.pathname, {
                path: "/tv/:id",
                exact: true,
                strict: false
            });

            setIsMatched(match || match2);
        }, [location]);

        return (<div className={(isMatched) ? 'container no-padding' : 'container' }>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/movie"} exact component={Movies}/>
                <Route path={"/tv"} exact component={TvShows}/>
                <Route path={"/watchlist"} exact component={Watchlist}/>
                <Route path={"/auth/session"} component={Session}/>
                <Route path={"/movie/:id"} exact component={MovieDetails}/>
                <Route path={"/tv/:id"} exact component={TvShowDetails}/>
            </Switch>
        </div>)
    }

    return (
        <Router forceRefresh={true}>
            <div className="App">
                <Header/>
                <Content />
            </div>
        </Router>
    );
}

export default App;