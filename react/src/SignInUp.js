import React from 'react';
import { Link } from 'react-router-dom';
import DropMenu from './DropMenu';
import SignIn from './SignIn';

import './SignInUp.scss';

function SignInUp() {
  return (
    <div className="sign-in-up">
      <DropMenu button={() => <span className="link-primary">sign in</span>}>
        <SignIn />
      </DropMenu>
      <Link
        className="link-primary"
        to="/sign-up"
      >
        sign up
      </Link>
    </div>
  );
}

export default SignInUp;
