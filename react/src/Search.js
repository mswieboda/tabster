import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import TabSearchResults from './TabSearchResults';

import './Search.scss';

function Search() {
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState([]);

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
  }

  return (
    <div className="search">
      <SearchInput search={search} onSearchChange={onSearchChange} onSearchReset={onSearchReset} />
      <TabSearchResults tabs={tabs} onSearchReset={onSearchReset} />
    </div>
  );
}

export default Search;
