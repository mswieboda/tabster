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
            <TabLink key={tab.id} artist={tab.artist} title={tab.title}>
              <li className="search-result" onClick={onSearchReset}>
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
