
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';

function App(): JSX.Element {
  return (
      <div className="App">
        <div className={'container'}>
          <Switch>
            <Route path={"/"} exact={true} component={Home} />
          </Switch>
        </div>
      </div>
  );
}
export default App;