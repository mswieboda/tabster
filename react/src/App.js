import React from 'react';
import './App.scss';
import ArtistTabs from './ArtistTabs';
import Tabs from './Tabs';
import Tab from './Tab';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <TopNav />

        <Switch>
          <Route exact path="/">
            <Redirect to="/tabs" />
          </Route>
          <Route path="/tabs">
            <Switch>
              <Route exact path="/tabs" component={Tabs}/>
              <Route path="/tabs/:artist">
                <Switch>
                  <Route exact path="/tabs/:artist" component={ArtistTabs}/>
                  <Route exact path="/tabs/:artist/:title" component={Tab}/>
                </Switch>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function TopNav() {
  return (
    <header className="app-header">
      <Link to="/">tabster</Link>
    </header>
  );
}

export default App;
