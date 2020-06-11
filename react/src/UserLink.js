import React from 'react';
import { Link } from 'react-router-dom';
import { toURL } from './utils/url';

const ANONYMOUS_USERNAME = "anonymous";

function UserLink({ children, username }) {
  const encodedUrl = () => {
    return `/users/${toURL(username)}`;
  };

  if (username === ANONYMOUS_USERNAME) {
    return(children || username);
  }

  return (
    <Link to={encodedUrl()}>
      {children || username}
    </Link>
  );
}

export default UserLink;
