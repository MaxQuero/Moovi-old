
import React from 'react';
import Home from './views/Home/Home';
import Header from "./components/Header/Header";
import {Session} from "./guards/Auth/Auth";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(): JSX.Element {
  return (
      <Router>
          <div className="App">
            <div className={'container'}>
                <Header />
                <Switch>
                    <Route path={"/"} exact={true} component={Home} />
                    <Route path={"/auth/session"}  component={Session} />
                </Switch>
            </div>
          </div>
      </Router>
  );
}
export default App;