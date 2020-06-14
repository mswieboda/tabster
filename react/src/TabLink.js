import React from 'react';
import { Link } from 'react-router-dom';
import { toURL } from './utils/url';

function TabLink({ children, artist, title, edit, ...props }) {
  const encodedUrl = () => {
    let url = "/tabs/" + toURL(`${artist}/${title}`);

    if (edit) url += "/edit";

    return url;
  };

  return (
    <Link to={encodedUrl()} {...props}>
      {children || title}
    </Link>
  );
}

export default TabLink;
