import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useOnBlur } from './hooks/useOnBlur';
import { useResultSelect } from './hooks/useResultSelect';
import SearchInput from './SearchInput';

import './ArtistInput.scss';

function ArtistInput({setArtistId, setArtist}) {
  const [artistSearch, setArtistSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const searchRef = useRef();

  const onSearchChange = event => {
    const search = event.target.value;

    setArtistSearch(search);
    setArtist(search);
    setSelectedIndex(null);

    axios.get(`/api/artists?q=${search}`).then(response => {
      setArtists(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchReset = () => {
    onSearchResultsClear();
    setArtistId(null);
    setArtist(null);
    setArtistSearch("");
  };

  const onSearchResultsClear = () => {
    setArtists([]);
    setSelectedIndex(null);
  };

  const onSearchResultSelect = artist => {
    if (artist) {
      setArtistId(artist.id);
      setArtist(artist.name);
      setArtistSearch(artist.name);
    } else {
      let selectedArtist = artists[selectedIndex];

      if (selectedArtist) {
        setArtistId(selectedArtist.id);
        setArtist(selectedArtist.name);
        setArtistSearch(selectedArtist.name);
      } else {
        setArtistId(null);
        setArtist(artistSearch);
      }
    }
  };

  const onSearchResultClick = artist => {
    onSearchResultSelect(artist);
    onSearchResultsClear();
  }

  const { onKeyDown } = useResultSelect({
    results: artists,
    selectedIndex: selectedIndex,
    setSelectedIndex: setSelectedIndex,
    onResultSelect: onSearchResultSelect,
    onResultClick: onSearchResultClick,
    onResultsClear: onSearchResultsClear,
    tabToSelect: true,
  });

  useOnBlur(searchRef, onSearchResultsClear);

  return(
    <div className="artist-input" ref={searchRef} onKeyDown={onKeyDown}>
      <SearchInput
        search={artistSearch}
        onSearchChange={onSearchChange}
        onSearchReset={onSearchReset}
        placeholder="artist of song"
      />
      <ArtistSearchResults artists={artists} onSearchResultClick={onSearchResultClick} selectedIndex={selectedIndex} />
    </div>
  );
}

function ArtistSearchResults({artists, selectedIndex, onSearchResultClick}) {
  if (!artists || !artists.length) return null;

  return (
    <ul className="artist-results">
      {
        artists.map((artist, index) => {
          return (
            <li
              key={index}
              className={`artist-result${selectedIndex === index ? ' selected' : ''}`}
              onClick={() => onSearchResultClick(artist)}
            >
              {artist.name}
            </li>
          );
        })
      }
    </ul>
  );
}

export default ArtistInput;
