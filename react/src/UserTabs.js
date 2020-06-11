import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fromURL } from './utils/url';
import TabLink from './TabLink';

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

  const header = <h3>{fromURL(username)}</h3>;

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
            tabs.map((tab, index) => {
              return (
                <li key={index}>
                  <TabLink artist={tab.artist} title={tab.title}>{tab.artist} - {tab.title}</TabLink>
                </li>
              );
            })
          }
        </ul>
      }
      {tabs && !tabs.length &&
        <p>No tabs created by this user.</p>
      }
    </div>
  );
}

export default UserTabs;
