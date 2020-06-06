import React from 'react';
import { FaTimesCircle as CloseIcon } from 'react-icons/fa';

import './SearchInput.scss';

function SearchInput({
  search,
  icon,
  onSearchChange,
  onSearchReset,
  placeholder = "search",
}) {
  const styledIcon = icon && React.cloneElement(icon, { className: "icon"});

  return (
    <div className="search-input">
      {styledIcon}
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={onSearchChange}
      />
      <button
        className={`search-reset ${search === "" ? "hidden" : ""}`}
        type="reset"
        onClick={onSearchReset}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default SearchInput;
