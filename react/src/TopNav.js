import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TabLink from './TabLink';

import './TopNav.scss';

function TopNav() {
  const [tabs, setTabs] = useState([]);

  const onSearch = (event) => {
    axios.get(`/api/tabs?q=${event.target.value}`).then(response => {
      setTabs(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
      <header className="app-header">
        <Link to="/">tabster</Link>
      </header>

      <div className="links">
        <Link to="/tabs/new">+ New Tab</Link>
        <div>
          <input type="search" onChange={onSearch}/>
          <ul>
            {
              !!tabs.length && tabs.map(tab => {
                return (
                  <li key={tab.id}>
                    <TabLink artist={tab.artist} title={tab.title}>{tab.title} - {tab.artist}</TabLink>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
