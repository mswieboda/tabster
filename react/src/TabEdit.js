import React, { useState } from 'react';
import axios from 'axios';
import { toURL } from './utils/url';
import TabForm from './TabForm';

function TabEdit({
  history,
  id,
  user,
  title,
  artist,
  tab,
  createdByUsername,
}) {
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const onSave = ({title, artist, tab}) => {
    if (saving) return;

    setSaving(true);
    setError(null);

    axios.patch(`/api/tabs/${id}`, {
      title: title,
      artist: artist,
      tab: tab
    }).then(response => {
      const data = response.data;

      if (data) {
        history.push(`/tabs/${toURL(data.artist.name)}/${toURL(data.title)}`);
      }
    }).catch(error => {
      console.log(error);
      setSaving(false);
      setError(error.message);
    });
  };

  return (
    <div>
      {error &&
        <p>{error}</p>
      }
      <TabForm
        id={id}
        title={title}
        artist={artist}
        tab={tab}
        onSave={onSave}
      />
    </div>
  );
}

export default TabEdit;
