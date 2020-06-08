import React, { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { Link } from 'react-router-dom';
import {
  FaBars as MenuIcon,
} from 'react-icons/fa';

import './LoginMenu.scss';

function LoginMenu() {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const onMenuClick = event => {
    event.preventDefault();

    setMenuOpen(!menuOpen);
  }

  if (!user || !user.isLoggedIn) {
    return (
      <div>
        <Link
          className="btn-primary"
          to="/sign-in"
        >
          sign in
        </Link>
        <Link
          className="btn-primary"
          to="/sign-up"
        >
          sign up
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        className="btn-primary"
        onClick={onMenuClick}
      >
        <MenuIcon />
      </button>
      {menuOpen &&
        <div className="menu">
          <div>
            {user.email}
          </div>
          <div>
            {user.username}
          </div>
          <button
            className="btn-primary"
            onClick={() => userDispatch({ type: 'logout'})}
          >
            sign out
          </button>
        </div>
      }
    </div>
  );
}

export default LoginMenu;
