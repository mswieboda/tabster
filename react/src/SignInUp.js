import React from 'react';
import { Link } from 'react-router-dom';

function SignInUp() {
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

export default SignInUp;
