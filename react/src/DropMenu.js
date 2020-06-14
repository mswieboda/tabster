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
    if (event.target.onclick && event.target.href) {
      setOpen(false);
    }
  };

  const onMenuButtonClick = event => {
    setOpen(!open);
  };

  useOnBlur(ref, () => setOpen(false));

  return(
    <span
      className="drop-menu"
      onClick={onClick}
      ref={ref}
    >
      <span
        className="menu-btn link-primary"
        onClick={onMenuButtonClick}
      >
        {button()}
      </span>
      {open &&
        <div className="menu">
          {children}
        </div>
      }
    </span>
  );
}

export default DropMenu;
