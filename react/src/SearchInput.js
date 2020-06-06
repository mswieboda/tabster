import React from 'react';
import {
  FaSearch as SearchIcon,
  FaTimesCircle as CloseIcon,
} from 'react-icons/fa';

import './SearchInput.scss';

function SearchInput({search, onSearchChange, onSearchReset}) {
  return (
    <div className="search-input-container">
      <form>
        <SearchIcon className="icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Search tabs"
          required
          value={search}
          onChange={onSearchChange}
        />
        <button
          className="search-reset"
          type="reset"
          onClick={onSearchReset}
        >
          <CloseIcon />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
