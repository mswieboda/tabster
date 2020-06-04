import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import TabLink from './TabLink';

function ArtistTabs() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabs, setTabs] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (loaded || loading) {
      return;
    }

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
  }, [loaded, loading, params.artist]);

  return (
    <div>
      <h3>{params.artist}</h3>
      {loading &&
        <p>
          Loading...
        </p>
      }
      {
        error &&
        <p>
          {error}
        </p>
      }
      <ul>
        {
          !!tabs.length && tabs.map(tab => {
            return (
              <li key={tab.id}>
                <TabLink artist={tab.artist} title={tab.title} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ArtistTabs;
