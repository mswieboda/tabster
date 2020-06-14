import React, { useContext, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { useOnBlur } from './hooks/useOnBlur';
import { signOut } from './apis/user';
import {
  FaBars as MenuIcon,
} from 'react-icons/fa';
import DropMenu from './DropMenu';
import ResetPassword from './ResetPassword';

import './SignedInMenu.scss';

function SignedInMenu({history}) {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const ref = useRef();

  const onSignOut = event => {
    event.preventDefault();

    signOut().then(response => {
      const data = response.data;

      if (data) {
        userDispatch({ type: 'logout'});
        history.push('/');
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  useOnBlur(ref, () => setShowResetPassword(false));

  return (
    <div className="signed-in-menu" ref={ref}>
      <DropMenu
        button={() =>
          <span className="menu-btn link-primary">
            <MenuIcon />
          </span>
        }
      >
        {showResetPassword && <ResetPassword />}
        {!showResetPassword &&
          <div>
            <div>
              {user.username}
            </div>
            <div>
              {user.email}
            </div>
            <div>
              <span className="link-primary" onClick={() => setShowResetPassword(true)}>reset password</span>
            </div>
            <div className="menu-footer">
              <span
                className="link-primary"
                onClick={onSignOut}
              >
                sign out
              </span>
            </div>
          </div>
        }
      </DropMenu>
    </div>
  );
}

export default withRouter(SignedInMenu);
