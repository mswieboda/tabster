import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { useOnBlur } from './hooks/useOnBlur';
import { useResultSelect } from './hooks/useResultSelect';
import { toURL } from './utils/url';
import SearchInput from './SearchInput';
import TabSearchResults from './TabSearchResults';

import './Search.scss';

function Search() {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tabs, setTabs] = useState([]);
  const searchRef = useRef();

  const onSearchChange = (event) => {
    const searchQuery = event.target.value;

    setSearch(searchQuery);
    setSelectedIndex(null);

    axios.get(`/api/tabs?q=${searchQuery}`).then(response => {
      setTabs(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchReset = () => {
    setSearch("");
    onSearchResultsClear();
  };

  const onSearchResultsClear = () => {
    setTabs([]);
    setSelectedIndex(null);
  };

  const onSearchResultClick = () => {
    let tab = tabs[selectedIndex];

    if (tab) {
      // TODO: use returning/rendering a  Redirect
      //       for some reason when it does redirect
      //       this Search component is no longer rendered
      window.location.assign(`/tabs/${toURL(tab.artist)}/${toURL(tab.title)}`);
    }
  };

  const { onKeyDown } = useResultSelect({
    results: tabs,
    selectedIndex: selectedIndex,
    setSelectedIndex: setSelectedIndex,
    onResultClick: onSearchResultClick,
    onResultsClear: onSearchResultsClear,
  });

  useOnBlur(searchRef, onSearchReset);

  return (
    <div className="search" ref={searchRef} onKeyDown={onKeyDown}>
      <SearchInput
        search={search}
        icon={<SearchIcon />}
        onSearchChange={onSearchChange}
        onSearchReset={onSearchReset}
        placeholder="search tabs"
      />
      <TabSearchResults tabs={tabs} onSearchReset={onSearchReset} selectedIndex={selectedIndex} />
    </div>
  );
}

export default Search;
