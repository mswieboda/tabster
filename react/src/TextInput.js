import React from 'react';

import './TextInput.scss';

export default function TextInput(props) {
  return(
    <span className="wrapper">
      <input type="text" {...props} />
    </span>
  );
};
