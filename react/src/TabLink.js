import React from 'react';
import { Link } from 'react-router-dom';

function TabLink({ children, artist, title }) {
  const encodedUrl = () => {
    return `/tabs/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
  };

  return (
    <Link to={encodedUrl()}>
      {children || title}
    </Link>
  );
}

export default TabLink;
