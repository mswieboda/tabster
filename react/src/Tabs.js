import React, { useState, useEffect } from 'react';
import {
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import axios from 'axios';
import Tab from './Tab';

function Tabs() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabs, setTabs] = useState([]);
  let { path } = useRouteMatch();

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
    <div>
      <ul>
        {
          tabs.length && tabs.map(tab => {
            return (
              <li key={tab.id}>
                <TabLink path={path} artist={tab.artist} title={tab.title} />
              </li>
            );
          })
        }
      </ul>
      <Route path={`${path}/:artist/:title`} component={Tab} />
    </div>
  );
}

function TabLink({ path, artist, title }) {
  return (
    <Link to={`${path}/${artist}/${title}`}>{title} - {artist}</Link>
  );
}

export default Tabs;
