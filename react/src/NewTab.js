import React, { useState } from 'react';
import axios from 'axios';
import { useInput } from './hooks/useInput';
import { Redirect } from 'react-router-dom';
import { toURL } from './utils/url';
import TextInput from './TextInput';
import SearchInput from './SearchInput';
import TabEditor from './TabEditor';

import './NewTab.scss';

const tabPlaceholder = `e|-------------
B|-------------
G|-------------
D|-------------
A|-------------
E|-------------
`;

function NewTab() {
  const { value: title, bind: bindTitle } = useInput('');
  const [artistId, setArtistId] = useState(null);
  const [artist, setArtist] = useState("");
  const { value: tab, bind: bindTab } = useInput(tabPlaceholder);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [artistName, setArtistName] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError(null);

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
    <form onSubmit={handleSubmit} className="new-tab-form">
      {error &&
        <p>{error}</p>
      }

      <div className="meta-input">
        <div className="field">
          <TextInput {...bindTitle} required placeholder="tab song title" />
        </div>

        <div className="field">
          <ArtistInput setArtistId={setArtistId} setArtist={setArtist} />
        </div>
      </div>

      <div className="field tab-field">
        <TabEditor {...bindTab} />
      </div>

      <div className="field">
        <input
          className="save-button"
          type="submit"
          value="save"
        />
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
    setArtistId(null);
    setArtist(null);
    setArtistSearch("");
  };

  const onSearchResultClick = artist => {
    setArtists([]);

    if (artist) {
      setArtistId(artist.id);
      setArtist(artist.name);
      setArtistSearch(artist.name);
    } else {
      setArtistId(null);
      setArtist(artistSearch);
    }
  }

  return(
    <div className="artist-input">
      <SearchInput
        search={artistSearch}
        onSearchChange={onSearchChange}
        onSearchReset={onSearchReset}
        placeholder="artist of song"
      />
      <ArtistSearchResults artists={artists} onSearchResultClick={onSearchResultClick} />
    </div>
  );
}

function ArtistSearchResults({artists, onSearchResultClick}) {
  if (!artists || !artists.length) return null;

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
