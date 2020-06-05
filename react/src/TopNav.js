import React from 'react';
import { Link } from 'react-router-dom';

import './TopNav.scss';

function TopNav() {
  return (
    <div>
      <header className="app-header">
        <Link to="/">tabster</Link>
      </header>

      <div className="links">
        <Link to="/tabs/new">+ New Tab</Link>
      </div>
    </div>
  );
}

export default TopNav;
