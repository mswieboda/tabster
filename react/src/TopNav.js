import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { FaPlusCircle as AddIcon } from 'react-icons/fa';

import './TopNav.scss';

function TopNav() {
  return (
    <div>
      <header className="header">
        <div className="links">
          <Search />
          <Link to="/tabs/new" className="new-tab-link"><AddIcon className="icon" /> new tab</Link>
        </div>
        <div className="app-banner">
          <Link to="/">tabster</Link>
        </div>
      </header>


    </div>
  );
}

export default TopNav;
