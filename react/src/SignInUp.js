import React from 'react';
import DropMenu from './DropMenu';
import SignIn from './SignIn';
import SignUp from './SignUp';

import './SignInUp.scss';

function SignInUp() {
  return (
    <div className="sign-in-up">
      <DropMenu button={() => <span className="link-primary">sign in</span>}>
        <SignIn />
      </DropMenu>
      <DropMenu button={() => <span className="link-primary">sign up</span>}>
        <SignUp />
      </DropMenu>
    </div>
  );
}

export default SignInUp;
