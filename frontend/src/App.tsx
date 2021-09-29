import React from 'react';
import Home from './views/Home/Home';
import Header from "./components/Header/Header";
import {Session} from "./guards/Auth/Auth";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieDetails from "./views/MovieDetails/MovieDetails";
import "./App.scss";
import Watchlist from "./views/Watchlist/Watchlist";

function App(): JSX.Element {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="container">

                    <Switch>
                        <Route path={"/"} exact component={Home}/>
                        <Route path={"/movie/:id"} exact component={MovieDetails}/>
                        <Route path={"/watchlist"} exact component={Watchlist}/>
                        <Route path={"/auth/session"} component={Session}/>
                    </Switch>
                </div>
            </div>

        </Router>
    );
}

export default App;