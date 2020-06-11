import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fromURL } from './utils/url';
import TabList from './TabList';

function UserTabs() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function loadUserTabs() {
    if (loading || loaded) return;

    setLoading(true);

    axios.get(`/api/tabs?username=${username}`).then(response => {
      setTabs(response.data);

      setLoaded(true);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoaded(true);
      setLoading(false);
      setError(error.message);
    });
  }, [loading, loaded, username]);

  return (
    <div>
      <h3>{fromURL(username)}</h3>
      {error &&
        <p>{error}</p>
      }
      <TabList
        tabs={tabs}
        renderTabText={tab => `${tab.artist} - ${tab.title}`}
        renderEmpty={(<p>No tabs created by this user.</p>)}
      />
    </div>
  );
}

export default UserTabs;
