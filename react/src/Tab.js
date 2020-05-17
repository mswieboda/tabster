import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Tab.scss';

function Tab() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tab, setTab] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id || loaded || loading) {
      return;
    }

    setLoading(true);

    axios.get(`/api/tabs/${id}`).then(response => {
      const data = response.data;

      setTitle(data.title);
      setArtist(data.artist);
      setTab(data.tab);
      setLoaded(true);
      setLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }, [loaded, loading, id]);

  return (
    <div>
      <h3>ID: {id}</h3>

      { !loaded &&
        <h3>Loading...</h3>
      }
      { loaded &&
        <>
          <h3>Title: {title}</h3>
          <h3>Artist: {artist}</h3>
          <h3>Tab:</h3>
          <pre>{tab}</pre>
        </>
      }
    </div>
  );
}

export default Tab;
