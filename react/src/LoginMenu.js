import React, { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import useRedirect from './hooks/useRedirect';
import { Link } from 'react-router-dom';
import { signOut } from './apis/user';
import {
  FaBars as MenuIcon,
} from 'react-icons/fa';

import './LoginMenu.scss';

function LoginMenu() {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const { redirect, setRedirect, renderRedirect } = useRedirect(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const onMenuClick = event => {
    event.preventDefault();

    setMenuOpen(!menuOpen);
  };

  const onSignOut = event => {
    event.preventDefault();

    signOut().then(response => {
      const data = response.data;

      if (data) {
        userDispatch({ type: 'logout'});
        setRedirect('/');
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  if (redirect) return renderRedirect();

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
            onClick={onSignOut}
          >
            sign out
          </button>
        </div>
      }
    </div>
  );
}

export default LoginMenu;
