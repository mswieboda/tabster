import React from 'react';
import './App.scss';
import Tabs from './Tabs';

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
          <Route path="/tabs" component={Tabs} />
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
