import React from 'react';
import { Link } from 'react-router-dom';
import { toURL } from './utils/url';

function TabLink({ children, artist, title }) {
  const encodedUrl = () => {
    return `/tabs/${toURL(artist)}/${toURL(title)}`;
  };

  return (
    <Link to={encodedUrl()}>
      {children || title}
    </Link>
  );
}

export default TabLink;
