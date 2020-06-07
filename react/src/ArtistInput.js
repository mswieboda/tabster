import React, { useState } from 'react';
import axios from 'axios';
import ComboBox from './ComboBox';

import './ArtistInput.scss';

function ArtistInput({
  required,
  placeholder,
  setArtistId,
  setNewArtist
}) {
  const [artists, setArtists] = useState([]);

  const onSearchChange = value => {
    setNewArtist(value);

    axios.get(`/api/artists?q=${value}`).then(response => {
      setArtists(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchResultSelect = artist => {
    if (artist) {
      setArtistId(artist.id);
      setNewArtist(artist.name);
    } else {
      setArtistId(null);
    }
  };

  return(
    <ComboBox
      items={artists}
      required={required}
      placeholder={placeholder}
      renderItem={(artist, index, highlighted) => artist.name}
      onChange={onSearchChange}
      onSelect={onSearchResultSelect}
      highlightOnTabKeyDown={true}
      valueChangeOnHighlight={artist => artist.name}
    />
  );
}

export default ArtistInput;
