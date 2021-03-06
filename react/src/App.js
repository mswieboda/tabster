import React from 'react';

import { UserProvider } from './contexts/UserContext';

import TopNav from './TopNav';
import TabNew from './TabNew';
import ArtistTabs from './ArtistTabs';
import Tabs from './Tabs';
import Tab from './Tab';
import ResetPassword from './ResetPassword';
import UserTabs from './UserTabs';

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
              <Route path="/tabs">
                <Switch>
                  <Route exact path="/tabs" component={Tabs} />
                  <Route exact path="/tabs/new" component={TabNew} />
                  <Route path="/tabs/:artist">
                    <Switch>
                      <Route exact path="/tabs/:artist" component={ArtistTabs} />
                      <Route exact path="/tabs/:artist/:title" component={Tab} />
                    </Switch>
                  </Route>
                </Switch>
              </Route>
              <Route path="/user">
                <Route exact path="/user/reset-password" component={ResetPassword} />
              </Route>
              <Route path="/users">
              <Route exact path="/users/:username" component={UserTabs} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
