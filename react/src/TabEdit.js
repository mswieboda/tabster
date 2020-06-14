import React, { useState } from 'react';
import axios from 'axios';
import TabForm from './TabForm';

function TabEdit({
  id,
  user,
  title,
  artist,
  tab,
  createdByUsername,
  onSave: onSaveProp,
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
      onSaveProp(response.data);
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
