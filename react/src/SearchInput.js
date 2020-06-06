import React from 'react';
import {
  FaSearch as SearchIcon,
  FaTimesCircle as CloseIcon,
} from 'react-icons/fa';

import './SearchInput.scss';

function SearchInput({search, onSearchChange, onSearchReset}) {
  return (
    <div className="search-input-container">
      <SearchIcon className="icon" />
      <input
        className="search-input"
        type="text"
        placeholder="Search tabs"
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
