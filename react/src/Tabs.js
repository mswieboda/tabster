import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TabList from './TabList';

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
    return <h3>loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div>
      <h3>newest tabs</h3>
      <TabList
        tabs={tabs}
        renderTabText={tab => `${tab.artist} - ${tab.title}`}
      />
    </div>
  );
}

export default Tabs;
