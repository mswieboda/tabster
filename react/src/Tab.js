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
    function santizeForServerComparison(string) {
      return string.toLowerCase().replace(/\+/g, ' ');
    }

    function sameTabLoaded(artist, title, params) {
      if (!artist || !title) return false;

      let artists = [artist, decodeURIComponent(params.artist)].map(santizeForServerComparison);
      let titles = [title, decodeURIComponent(params.title)].map(santizeForServerComparison);

      return artists[0] === artists[1] && titles[0] === titles[1];
    }

    if (loading || error || (loaded && sameTabLoaded(artist, title, params))) {
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
  }, [loading, loaded, error, artist, title, params]);

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
