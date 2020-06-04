import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import axios from 'axios';

function Tabs() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    if (loaded || loading) {
      return;
    }

    setLoading(true);

    axios.get('/api/tabs').then(response => {
      setTabs(response.data);

      setLoaded(true);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoaded(true);
      setLoading(false);
      setError(error.message);
    });
  }, [loaded, loading]);

  if (!loaded) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <ul>
      {
        tabs.length && tabs.map(tab => {
          return (
            <li key={tab.id}>
              <TabLink artist={tab.artist} title={tab.title} />
            </li>
          );
        })
      }
    </ul>
  );
}

function TabLink({ artist, title }) {
  return (
    <Link to={`/tabs/${artist}/${title}`}>{title} - {artist}</Link>
  );
}

export default Tabs;
