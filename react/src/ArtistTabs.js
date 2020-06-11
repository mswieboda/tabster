import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { fromURL } from './utils/url';
import TabList from './TabList';

function ArtistTabs() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tabs, setTabs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(function loadArtistTabs() {
    if (loading || loaded) return;

    setLoading(true);

    axios.get(`/api/tabs/${params.artist}`).then(response => {
      setTabs(response.data);

      setLoaded(true);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoaded(true);
      setLoading(false);
      setError(error.message);
    });
  }, [loading, loaded, params.artist]);

  return (
    <div>
      <h3>{fromURL(params.artist)}</h3>
      {error &&
        <p>{error}</p>
      }
      <TabList
        tabs={tabs}
        renderEmpty={() =>
          <p>
            No tabs found. Add a new tab <Link to="/tabs/new">here</Link>
          </p>
        }
      />
    </div>
  );
}

export default ArtistTabs;
