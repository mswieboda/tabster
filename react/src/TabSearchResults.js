import React from 'react';
import TabLink from './TabLink';

import './TabSearchResults.scss';

function TabSearchResults({tabs, onSearchReset}) {
  if (!tabs || !tabs.length) return null;

  return (
    <ul className="search-results">
      {
        tabs.map(tab => {
          return (
            <li key={tab.id} className="search-result" onClick={onSearchReset}>
              <TabLink artist={tab.artist} title={tab.title}>{tab.title} - {tab.artist}</TabLink>
            </li>
          );
        })
      }
    </ul>
  );
}

export default TabSearchResults;
