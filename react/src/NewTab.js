import React, { useState } from 'react';
import axios from 'axios';
import { useInput } from './hooks/useInput';
import { Redirect } from 'react-router-dom';
import { toURL } from './utils/url';
import SearchInput from './SearchInput';

import './NewTab.scss';

function NewTab() {
  const { value: title, bind: bindTitle } = useInput('');
  const { value: tab, bind: bindTab } = useInput('');
  const [artistId, setArtistId] = useState(null);
  const [artist, setArtist] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [artistName, setArtistName] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);

    axios.post('/api/tabs', {
      title: title,
      artist_id: artistId ? parseInt(artistId) : null,
      artist: artist,
      tab: tab
    }).then(response => {
      const data = response.data;

      setArtistName(data.artist);
      setSaving(false);
      setSaved(true);
    }).catch(error => {
      console.log(error);
      setSaving(false);
      setSaved(false);
      setError(error.message);
    });
  }

  if (!error && saved && artistName && title) {
    return(
      <Redirect to={`/tabs/${toURL(artistName)}/${toURL(title)}`} />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {!!error &&
          <span>Error: {error}</span>
        }
      </div>

      <div>
        <label>Title</label>
        <input type="text" {...bindTitle} required/>
      </div>

      <div>
        <label>Artist</label>
        <ArtistInput setArtistId={setArtistId} setArtist={setArtist} />
      </div>

      <div>
        <div>
          <label>Tab</label>
        </div>
        <textarea {...bindTab} required></textarea>
      </div>

      <div>
        <input type="submit" value="Save"/>
      </div>
    </form>
  );
}

function ArtistInput({setArtistId, setArtist}) {
  const [artistSearch, setArtistSearch] = useState("");
  const [artists, setArtists] = useState([]);

  const onSearchChange = event => {
    const search = event.target.value;

    setArtistSearch(search);
    setArtist(search);

    axios.get(`/api/artists?q=${search}`).then(response => {
      setArtists(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchReset = () => {
    setArtists([]);
  };

  const onSearchResultClick = artist => {
    if (artist) {
      setArtistId(artist.id);
      setArtist(artist.name);
      setArtistSearch(artist.name);
    } else {
      setArtistId(null);
      setArtist(artistSearch);
    }

    onSearchReset();
  }

  return(
    <div className="artist-input">
      <SearchInput
        search={artistSearch}
        onSearchChange={onSearchChange}
        onSearchReset={onSearchReset}
        placeholder="Search artists"
      />
      <ArtistSearchResults artists={artists} onSearchResultClick={onSearchResultClick} />
    </div>
  );
}

function ArtistSearchResults({artists, onSearchResultClick}) {
  if (!artists && !artists.length) return null;

  return (
    <ul className="artist-results">
      {
        artists.map((artist, index) => {
          return (
            <li
              key={index}
              className="artist-result"
              onClick={() => onSearchResultClick(artist)}
            >
              {artist.id} - {artist.name}
            </li>
          );
        })
      }
    </ul>
  );
}

export default NewTab;
