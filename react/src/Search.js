import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { toURL } from './utils/url';
import ComboBox from './ComboBox';
import TabLink from './TabLink';

import './Search.scss';

function Search({history}) {
  const [tabs, setTabs] = useState([]);

  const onSearchChange = value => {
    axios.get(`/api/tabs?q=${value}`).then(response => {
      setTabs(response.data);
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  const onSearchResultSelect = tab => {
    if (tab) {
      history.push(`/tabs/${toURL(tab.artist)}/${toURL(tab.title)}`);
    }
  };

  return (
    <div className="search">
      <ComboBox
        icon={<SearchIcon />}
        placeholder="search tabs"
        items={tabs}
        renderItem={(tab, index, highlighted) =>
          <TabLink artist={tab.artist} title={tab.title}>
            <div
              className={`search-result${highlighted ? ' selected' : ''}`}
            >
              {tab.title} - {tab.artist}
            </div>
          </TabLink>
        }
        onChange={onSearchChange}
        onSelect={onSearchResultSelect}
      />
    </div>
  );
}

export default withRouter(Search);
