
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from "./components/layouts/Header";

function App(): JSX.Element {
  return (
      <div className="App">
        <div className={'container'}>
            <Header />
            <Switch>
                <Route path={"/"} exact={true} component={Home} />
            </Switch>
        </div>
      </div>
  );
}
export default App;