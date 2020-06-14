import React, { useContext, useRef, useState } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
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
    <div className="signed-in-menu" ref={ref}>
      <div
        className="menu-btn link-primary"
        onClick={onMenuClick}
      >
        <MenuIcon />
      </div>
      {menuOpen &&
        <div className="menu">
          <div>
            {user.username}
          </div>
          <div>
            {user.email}
          </div>
          <div>
            <Link to={`/user/reset-password`}>reset password</Link>
          </div>
          <div className="footer">
            <span
              className="link-primary"
              onClick={onSignOut}
            >
              sign out
            </span>
          </div>
        </div>
      }
    </div>
  );
}

export default withRouter(SignedInMenu);
