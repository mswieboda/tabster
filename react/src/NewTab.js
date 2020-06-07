import React, { useState } from 'react';
import axios from 'axios';
import { useInput } from './hooks/useInput';
import { Redirect } from 'react-router-dom';
import { toURL } from './utils/url';
import TextInput from './TextInput';
import ArtistInput from './ArtistInput';
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
          className="btn-primary"
          type="submit"
          value="save"
        />
      </div>
    </form>
  );
}

export default NewTab;
