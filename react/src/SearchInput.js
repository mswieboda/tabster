import React from 'react';
import { FaTimesCircle as CloseIcon } from 'react-icons/fa';

import './SearchInput.scss';

function SearchInput({
  search,
  onSearchChange,
  onSearchReset,
  placeholder = "Search",
}) {
  return (
    <span className="search-input-container">
      <input
        className="search-input"
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
    </span>
  );
}

export default SearchInput;
