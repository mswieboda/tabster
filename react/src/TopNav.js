import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { UserContext } from './contexts/UserContext';
import SignedInMenu from './SignedInMenu';
import SignInUp from './SignInUp';
import {
  FaPlusCircle as AddIcon,
} from 'react-icons/fa';

import './TopNav.scss';

function TopNav() {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <div className="app-banner">
        <Link to="/">tabster</Link>
      </div>

      <div className="links">
        <Search />
        <div className="new-tab-container">
          <Link to="/tabs/new">
            <AddIcon className="icon" /> new tab
          </Link>
        </div>
      </div>

      <div className="gap">
      </div>

      {user && user.isLoggedIn ? <SignedInMenu /> : <SignInUp />}
    </header>
  );
}

export default TopNav;
