
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from "./components/layouts/Header";
import {Session} from "./guards/auth/Auth";

function App(): JSX.Element {
  return (
      <div className="App">
        <div className={'container'}>
            <Header />
            <Switch>
                <Route path={"/"} exact={true} component={Home} />
                <Route path={"/auth/session"}  component={Session} />

            </Switch>
        </div>
      </div>
  );
}
export default App;