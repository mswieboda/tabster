import React from 'react';

import { UserProvider } from './contexts/UserContext';

import TopNav from './TopNav';
import SignIn from './SignIn';
import SignUp from './SignUp';
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
    <UserProvider>
      <Router>
        <div className="app">
          <TopNav />
          <div className="page">
            <Switch>
              <Redirect exact from="/" to="/tabs" />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/tabs">
                <Switch>
                  <Route exact path="/tabs" component={Tabs} />
                  <Route exact path="/tabs/new" component={NewTab} />
                  <Route path="/tabs/:artist">
                    <Switch>
                      <Route exact path="/tabs/:artist" component={ArtistTabs} />
                      <Route exact path="/tabs/:artist/:title" component={Tab} />
                    </Switch>
                  </Route>
                </Switch>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
