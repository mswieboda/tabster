import React, { useContext, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { useOnBlur } from './hooks/useOnBlur';
import { signOut } from './apis/user';
import {
  FaBars as MenuIcon,
} from 'react-icons/fa';

import './SignedInMenu.scss';

function SignedInMenu({history}) {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef();

  const onMenuClick = event => {
    event.preventDefault();

    setMenuOpen(!menuOpen);
  };

  const onSignOut = event => {
    event.preventDefault();

    signOut().then(response => {
      const data = response.data;

      if (data) {
        setMenuOpen(false);
        userDispatch({ type: 'logout'});
        history.push('/');
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  useOnBlur(ref, () => setMenuOpen(false));

  return (
    <div ref={ref}>
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

export default withRouter(SignedInMenu);