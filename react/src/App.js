import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <TopNav />

        <Switch>
          <Route exact path="/">
            <Tabs />
          </Route>
          <Route path="/tabs/:id">
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
        <Link to="/tabs/123">123 - Testing</Link>
      </li>
      <li>
        <Link to="/tabs/lipgloss">Lipgloss - Charlie XCX</Link>
      </li>
    </ul>
  );
}

function Tab() {
  let { id } = useParams();

  return (
    <div>
      <h3>Tab: {id}</h3>
    </div>
  );
}

export default App;
