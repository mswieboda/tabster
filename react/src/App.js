import React from 'react';
import './App.scss';
import Tabs from './Tabs';
import Tab from './Tab';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <TopNav />

        <Switch>
          <Route exact path="/">
            <Tabs />
          </Route>
          <Route path="/tabs/:artist/:title">
            <Tab />
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
