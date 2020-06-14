import React, { useContext } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { signOut } from './apis/user';
import {
  FaBars as MenuIcon,
} from 'react-icons/fa';
import DropMenu from './DropMenu';

import './SignedInMenu.scss';

function SignedInMenu({history}) {
  const { user, dispatch: userDispatch } = useContext(UserContext);

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

  return (
    <DropMenu button={() => <MenuIcon />}>
      <div>
        {user.username}
      </div>
      <div>
        {user.email}
      </div>
      <div>
        <Link to={`/user/reset-password`}>reset password</Link>
      </div>
      <div className="signed-in-menu-footer">
        <span
          className="link-primary"
          onClick={onSignOut}
        >
          sign out
        </span>
      </div>
    </DropMenu>
  );
}

export default withRouter(SignedInMenu);
