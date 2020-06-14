import React, { useState } from 'react';
import axios from 'axios';
import { toURL } from './utils/url';
import TabForm from './TabForm';

function TabNew({history}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const onSave = ({title, artist, tab}) => {
    if (saving) return;

    setSaving(true);
    setError(null);

    axios.post('/api/tabs', {
      title: title,
      artist: artist,
      tab: tab
    }).then(response => {
      const data = response.data;

      if (data) {
        history.push(`/tabs/${toURL(data.artist.name)}/${toURL(data.title)}`);
      }
    }).catch(error => {
      const data = error.response.data;

      setSaving(false);

      if (data) {
        console.log(data.message);
        setError(data.message);
      }
    });
  };

  return (
    <div>
      {error &&
        <p>{error}</p>
      }
      <TabForm onSave={onSave} />
    </div>
  );
}

export default TabNew;
