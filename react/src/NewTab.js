import React, { useState } from 'react';
import axios from 'axios';
import { useInput } from './hooks/useInput';
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

function NewTab({history}) {
  const { value: title, bind: bindTitle } = useInput('');
  const [artistId, setArtistId] = useState(null);
  const [newArtist, setNewArtist] = useState("");
  const { value: tab, bind: bindTab } = useInput(tabPlaceholder);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError(null);

    axios.post('/api/tabs', {
      title: title,
      artist_id: artistId ? parseInt(artistId) : null,
      artist: newArtist,
      tab: tab
    }).then(response => {
      const data = response.data;

      history.push(`/tabs/${toURL(data.artist)}/${toURL(title)}`);
    }).catch(error => {
      console.log(error);
      setSaving(false);
      setError(error.message);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="new-tab-form">
      {error &&
        <p>{error}</p>
      }

      <div className="meta-input">
        <div className="field">
          <TextInput
            required
            placeholder="tab song title"
            {...bindTitle}
          />
        </div>

        <div className="field">
          <ArtistInput
            required
            placeholder="artist of song"
            setArtistId={setArtistId}
            setNewArtist={setNewArtist}
          />
        </div>
      </div>

      <div className="field field-tab">
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
