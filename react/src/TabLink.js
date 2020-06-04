import React from 'react';
import { Link } from 'react-router-dom';

function TabLink({ artist, title, text = title }) {
  return (
    <Link to={`/tabs/${artist}/${title}`}>{text}</Link>
  );
}

export default TabLink;
