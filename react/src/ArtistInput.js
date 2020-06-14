import React, { useState } from 'react';
import axios from 'axios';
import {
  useNonNativeInput,
} from './hooks/useInput';
import ComboBox from './ComboBox';

import './ArtistInput.scss';

function ArtistInput({
  required,
  placeholder,
  readOnly,
  onChange,
  value
}) {
  const { value: artist, setValue: setArtist } = useNonNativeInput(value);
  const [artists, setArtists] = useState([]);

  const onSearchChange = value => {
    onArtistChange({id: null, name: value});

    axios.get(`/api/artists?q=${value}`).then(response => {
      setArtists(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchResultSelect = newArtist => {
    onArtistChange({id: newArtist.id, name: newArtist.name});
  };

  const onArtistChange = newArtist => {
    setArtist(newArtist);
    onChange(newArtist);
  };

  return(
    <ComboBox
      value={artist ? artist.name : ""}
      items={artists}
      required={required}
      placeholder={placeholder}
      readOnly={readOnly}
      renderItem={(artist, index, highlighted) => artist.name}
      onChange={onSearchChange}
      onSelect={onSearchResultSelect}
      highlightOnTabKeyDown={true}
      valueChangeOnHighlight={artist => artist.name}
    />
  );
}

export default ArtistInput;
