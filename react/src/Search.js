import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { useOnBlur } from './hooks/useOnBlur';
import SearchInput from './SearchInput';
import TabSearchResults from './TabSearchResults';

import './Search.scss';

function Search() {
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState([]);
  const searchRef = useRef();

  const onSearchChange = (event) => {
    const searchQuery = event.target.value;

    setSearch(searchQuery);

    axios.get(`/api/tabs?q=${searchQuery}`).then(response => {
      setTabs(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchReset = () => {
    setSearch("");
    setTabs([]);
  };

  useOnBlur(searchRef, onSearchReset);

  return (
    <div className="search" ref={searchRef}>
      <SearchInput
        search={search}
        icon={<SearchIcon />}
        onSearchChange={onSearchChange}
        onSearchReset={onSearchReset}
        placeholder="search tabs"
      />
      <TabSearchResults tabs={tabs} onSearchReset={onSearchReset} />
    </div>
  );
}

export default Search;
