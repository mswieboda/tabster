import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useLocation,
  useParams,
  Link,
} from 'react-router-dom';
import {
  toURL,
  fromURL,
} from './utils/url';
import TabLink from './TabLink';

function ArtistTabs() {
  const location = useLocation();
  const params = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(function redirectToCorrectURL() {
    const path = `/tabs/${toURL(params.artist)}`;

    if (location.pathname !== path) {
      window.location.assign(path + location.search);
      setRedirect(true);
    }
  }, [location, params]);

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    if (redirect || loading || loaded) {
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
  }, [redirect, loading, loaded, params.artist]);

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
