import React from 'react';
import { Link } from 'react-router-dom';

import './SignInUp.scss';

function SignInUp() {
  return (
    <div className="sign-in-up">
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

export default SignInUp;
