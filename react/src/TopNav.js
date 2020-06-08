import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import LoginMenu from './LoginMenu';
import {
  FaPlusCircle as AddIcon,
} from 'react-icons/fa';

import './TopNav.scss';

function TopNav() {
  return (
    <header className="header">
      <div className="app-banner">
        <Link to="/">tabster</Link>
      </div>

      <div className="links">
        <Search />
        <Link
          to="/tabs/new"
          className="new-tab-link"
        >
          <AddIcon className="icon" /> new tab
        </Link>
      </div>

      <div className="gap">
      </div>

      <LoginMenu />
    </header>
  );
}

export default TopNav;
