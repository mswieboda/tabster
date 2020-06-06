import React from 'react';

import './TextInput.scss';

export default function TextInput(props) {
  return(
    <div className="text-input">
      <input type="text" {...props} />
    </div>
  );
};
