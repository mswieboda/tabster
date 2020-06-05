import React from 'react';
import { Link } from 'react-router-dom';

function TabLink({ children, artist, title }) {
  return (
    <Link to={`/tabs/${artist}/${title}`}>
      {children || title}
    </Link>
  );
}

export default TabLink;
