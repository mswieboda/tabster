import React, { useState } from 'react';
import axios from 'axios';
import { useInput } from './hooks/useInput';
import TabLink from './TabLink';

function NewTab() {
  const { value: title, bind: bindTitle } = useInput('');
  const { value: artistId, bind: bindArtistId } = useInput('');
  const { value: artist, bind: bindArtist } = useInput('');
  const { value: tab, bind: bindTab } = useInput('');
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
      artist_id: artistId !== 'new' ? parseInt(artistId) : null,
      artist: artistId === 'new' ? artist : null,
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {!!error &&
          <span>Error: {error}</span>
        }
        {!error && saved &&
          <span>
            Saved!{' '}
            <TabLink artist={artistName} title={title}>View new tab</TabLink>
          </span>
        }
      </div>

      <div>
        <label>Title</label>
        <input type="text" {...bindTitle} required/>
      </div>

      <div>
        <label>Artist</label>
        <select {...bindArtistId} required>
          <option value="">Select an Artist</option>
          <option value="1">Charli XCX</option>
          <option value="new">+ New Artist</option>
        </select>

        { artistId === "new" &&
          <input type="text" {...bindArtist} required/>
        }
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

export default NewTab;
