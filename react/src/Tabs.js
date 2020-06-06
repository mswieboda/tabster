import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TabLink from './TabLink';

import './Tabs.scss';

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

    axios.get('/api/tabs?sort=newest').then(response => {
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
    <div>
      <h3>Newest Tabs</h3>
      <ul className="tabs">
        {
          !!tabs.length && tabs.map(tab => {
            return (
              <li key={tab.id} className="tab">
                <TabLink artist={tab.artist} title={tab.title}>{tab.artist} - {tab.title}</TabLink>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tabs;
