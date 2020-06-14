import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { toURL } from './utils/url';
import TabEdit from './TabEdit';
import TabLink from './TabLink';
import UserLink from './UserLink';
import {
  FaPen as EditIcon,
  FaRegStar as AddIcon,
  FaLastfmSquare as LastFMIcon,
} from 'react-icons/fa';

import './Tab.scss';

function Tab({history}) {
  const { user } = useContext(UserContext)
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [tabID, setTabID] = useState(null);
  const [artist, setArtist] = useState(null);
  const [createdByUsername, setCreatedByUsername] = useState(null);
  const [tab, setTab] = useState(null);
  const [title, setTitle] = useState(null);

  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  const canEdit = () => createdByUsername === user.username;
  const canAdd = () => user.isLoggedIn;

  const sameTabLoaded = (artist, title, params) => {
    if (!artist || !title || !params.artist || !params.title) return false;

    function toLowerURL(artistName, title) {
      return toURL(`${artistName}/${title}`).toLowerCase();
    }

    return toLowerURL(artist.name, title) === toLowerURL(params.artist, params.title);
  };

  const onEditSave = data => {
    setEdit(false);

    if (sameTabLoaded(data.artist, data.title, params)) {
      setTabID(data.id);
      setArtist(data.artist);
      setCreatedByUsername(data.created_by_username);
      setTab(data.tab);
      setTitle(data.title);
    } else {
      history.push(`/tabs/${toURL(data.artist.name)}/${toURL(data.title)}`);
      setLoaded(false);
    }
  };

  useEffect(function loadTab() {
    if (loading || error || (loaded && sameTabLoaded(artist, title, params))) {
      return;
    }

    if (loading || error || loaded) return;

    setLoading(true);

    axios.get(`/api/tabs/${params.artist}/${params.title}`).then(response => {
      const data = response.data;

      setTabID(data.id);
      setArtist(data.artist);
      setCreatedByUsername(data.created_by_username);
      setTab(data.tab);
      setTitle(data.title);

      setLoaded(true);
      setLoading(false);
    }).catch(e => {
      const data = e.response.data;
      console.log(data.message);

      setError(data.message);
      setLoaded(true);
      setLoading(false);
    });
  }, [loading, loaded, error, artist, title, params]);

  if (!loaded) {
    return <h3>loading...</h3>;
  }

  if (error) {
    let message = <h3>{error}</h3>;

    if (error === "Tab not found") {
      message = <p>No tab found. Add a new tab <Link to="/tabs/new">here</Link>.</p>;
    }

    return message;
  }

  if (edit) {
    return(
      <TabEdit
        id={tabID}
        user={user}
        artist={artist}
        createdByUsername={createdByUsername}
        title={title}
        tab={tab}
        onSave={onEditSave}
      />
    );
  }

  return (
    <div>
      <div className="tab-header">
        <div>
          <div>
            <TabLink artist={artist.name} title={title} />{' '}
            by{' '}
            <Link to={`/tabs/${toURL(artist.name)}`}>{artist.name}</Link>{' '}
          </div>
          <div>
            created by <UserLink username={createdByUsername} />
          </div>
        </div>
        <div className="tab-actions">
          {canEdit() &&
            <span
              className="link-primary action"
              onClick={() => setEdit(true)}
            >
              <EditIcon /> edit
            </span>
          }
          {canAdd() &&
            <span
              className="link-primary action"
            >
              <AddIcon /> add
            </span>
          }
          <a className="action" href="https://last.fm/music/blink-182"><LastFMIcon /> lastfm</a>
        </div>
      </div>
      <pre className="tab">{tab}</pre>
    </div>
  );
}

export default Tab;
