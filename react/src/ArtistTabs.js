import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import useRedirectToCorrectPath from './hooks/useRedirectToCorrectPath';
import { toURL, fromURL } from './utils/url';
import TabLink from './TabLink';

function ArtistTabs() {
  const params = useParams();
  const isCorrectPath = useRedirectToCorrectPath(`/tabs/${toURL(params.artist)}`);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function loadArtistTabs() {
    if (!isCorrectPath || loading || loaded) return;

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
  }, [isCorrectPath, loading, loaded, params.artist]);

  const header = <h3>{fromURL(params.artist)}</h3>;

  if (!loaded) {
    return(
      <div>
        {header}
        <p>
          {!loading && error ? error : "loading..."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {header}
      {tabs && !!tabs.length &&
        <ul>
          {
            tabs.map(tab => {
              return (
                <li key={tab.id}>
                  <TabLink artist={tab.artist} title={tab.title} />
                </li>
              );
            })
          }
        </ul>
      }
      {tabs && !tabs.length &&
        <p>No tabs found. Add a new tab <Link to="/tabs/new">here</Link>.</p>
      }
    </div>
  );
}

export default ArtistTabs;
