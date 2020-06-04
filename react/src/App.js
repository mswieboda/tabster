import React from 'react';
import './App.scss';
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

function Tabs() {
  return (
    <ul>
      <li>
        <TabLink id="lipgloss" artist="Charlie XCX" title="Lipgloss"/>
      </li>
      <li>
        <TabLink id="test-123" artist="Testing" title="123"/>
      </li>
    </ul>
  );
}

function TabLink(props) {
  const {id, title, artist} = props;

  return (
    <Link to={`/tabs/${id}`}>{title} - {artist}</Link>
  );
}

export default App;
