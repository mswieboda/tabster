import React, { useRef, useState} from 'react';
import { useOnBlur } from './hooks/useOnBlur';

import './DropMenu.scss';

function DropMenu({
  button,
  children,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const onClick = event => {
    if (event.target.onclick) {
      setOpen(false);
    }
  };

  const onMenuButtonClick = event => {
    event.stopPropagation();

    setOpen(!open);
  };

  useOnBlur(ref, () => setOpen(false));

  return(
    <div
      className="drop-menu"
      onClick={onClick}
      ref={ref}
    >
      <div
        className="menu-btn link-primary"
        onClick={onMenuButtonClick}
      >
        {button()}
      </div>
      {open &&
        <div className="menu">
          {children}
        </div>
      }
    </div>
  );
}

export default DropMenu;
