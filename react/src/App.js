import React from 'react';

import TopNav from './TopNav';
import NewTab from './NewTab';
import ArtistTabs from './ArtistTabs';
import Tabs from './Tabs';
import Tab from './Tab';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.scss';

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
              <Route exact path="/tabs/new" component={NewTab}/>
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

export default App;
