import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TabLink from './TabLink';
import './Tab.scss';

function Tab() {
  const [title, setTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tab, setTab] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (loading || error || (loaded && artist === params.artist && title === params.title)) {
      return;
    }

    setLoading(true);

    axios.get(`/api/tabs/${params.artist}/${params.title}`).then(response => {
      const data = response.data;

      setTitle(data.title);
      setArtist(data.artist);
      setTab(data.tab);
      setLoaded(true);
      setLoading(false);
    }).catch(e => {
      const data = e.response.data;
      console.log(data.message);

      setError(data.message);
      setLoaded(true);
      setLoading(false);
    });
  }, [loading, loaded, artist, params.artist, title, params.title, error]);

  if (!loaded) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div>
      <p>
        Title:{' '}
        <TabLink artist={artist} title={title} />
      </p>
      <p>
        Artist:{' '}
        <Link to={`/tabs/${artist}`}>{artist}</Link>
      </p>
      <p>Tab:</p>
      <pre>{tab}</pre>
    </div>
  );
}

export default Tab;
