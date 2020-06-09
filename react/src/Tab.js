import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import useRedirectToCorrectPath from './hooks/useRedirectToCorrectPath';
import { toURL } from './utils/url';
import TabLink from './TabLink';
import './Tab.scss';

function Tab(props) {
  const params = useParams();
  const isCorrectPath = useRedirectToCorrectPath(`/tabs/${toURL(params.artist)}/${toURL(params.title)}`);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tab, setTab] = useState(null);
  const [error, setError] = useState(null);

  useEffect(function loadTab() {
    if (!isCorrectPath) return;

    function sameTabLoaded(artist, title, params) {
      if (!artist || !title) return false;

      let artists = [artist, params.artist].map(s => toURL(s).toLowerCase());
      let titles = [title, params.title].map(s => toURL(s).toLowerCase());

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
  }, [isCorrectPath, loading, loaded, error, artist, title, params]);

  if (!loaded) {
    return <h3>loading...</h3>;
  }

  if (error) {
    let message = <h3>{error}</h3>;

    if (error === "Tab not found") {
      message = <p>No tab found. Add a new tab <Link to="/tabs/new">here</Link>.</p>;
    }

    return message;
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
      <pre className="tab">{tab}</pre>
    </div>
  );
}

export default Tab;
