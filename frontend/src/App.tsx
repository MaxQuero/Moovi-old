import React, { useState } from 'react';
import Home from './views/Home/Home';
import Header from './components/Header/Header';
import { Session } from './guards/Auth/Auth';
import {BrowserRouter as Router, Route, useLocation} from 'react-router-dom';
import './App.scss';
import Watchlist from './views/Watchlist/Watchlist';
import {matchPath} from 'react-router';
import Medias from './views/Medias/Medias';
import { MediaEnum } from './interfaces/Media.interface';
import MediaDetails from './views/MediaDetails/MediaDetails';
import {Routes} from "react-router-dom"
function App(): JSX.Element {
  const Content = () => {
    const location = useLocation();

    const [isMatched, setIsMatched]: [any, any] = useState(null);
    let match, match2;
    React.useEffect(() => {
      match = matchPath({
        path: '/movie/:id',
        end: true,
        caseSensitive: false,
      }, location.pathname);

      match2 = matchPath({
        path: '/tv/:id',
        end: true,
        caseSensitive: false,
      },location.pathname);

      setIsMatched(match || match2);
    }, [location]);

    return (
      <div className={isMatched ? 'container no-padding' : 'container'}>
        <Routes>
          <Route path={'/'} element={<Home />}>
          </Route>
          <Route path={'/movie'} element={<Medias mediaType={MediaEnum.Movie} />}>
          </Route>
          <Route path={'/tv'} element={<Medias mediaType={MediaEnum.Tv} />}>
          </Route>
          <Route path={'/watchlist'} element={<Watchlist />}>
          </Route>
          <Route path={'/auth/session'} element={<Session />}>
          </Route>
          <Route path={'/movie/:id'} element={<MediaDetails mediaType={MediaEnum.Movie} />}>
          </Route>
          <Route path={'/tv/:id'} element={<MediaDetails mediaType={MediaEnum.Tv} />}>
          </Route>
        </Routes>
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Content />
      </div>
    </Router>
  );
}

export default App;
