import React from 'react';
import { Link } from 'react-router-dom';
import { toURL } from './utils/url';

function TabLink({ children, artist, title, edit, ...props }) {
  const encodedUrl = () => {
    return "/tabs/" + toURL(`${artist}/${title}`);
  };

  return (
    <Link to={encodedUrl()} {...props}>
      {children || title}
    </Link>
  );
}

export default TabLink;
