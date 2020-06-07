import React from 'react';
import TabLink from './TabLink';

import './TabSearchResults.scss';

function TabSearchResults({tabs, onSearchReset, selectedIndex}) {
  if (!tabs || !tabs.length) return null;

  return (
    <ul className="search-results">
      {
        tabs.map((tab, index) => {
          return (
            <TabLink key={index} artist={tab.artist} title={tab.title}>
              <li
                className={`search-result${selectedIndex === index ? ' selected' : ''}`}
                onClick={onSearchReset}>
                {tab.title} - {tab.artist}
              </li>
            </TabLink>
          );
        })
      }
    </ul>
  );
}

export default TabSearchResults;
