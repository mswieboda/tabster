import React from 'react';
import TabLink from './TabLink';

import './TabList.scss';

function TabList({tabs, renderTabText, renderEmpty}) {
  if (!tabs) {
    return(<p>loading...</p>);
  }

  if (!tabs.length && renderEmpty) {
    return({renderEmpty});
  }

  return(
    <ul className="tab-list">
      {tabs.map((tab, index) => {
        return (
          <li key={index} className="tab">
            {renderTabText &&
              <TabLink
                artist={tab.artist}
                title={tab.title}
              >
                {renderTabText(tab)}
              </TabLink>
            }
            {!renderTabText &&
              <TabLink
                artist={tab.artist}
                title={tab.title}
              />
            }
          </li>
        );
      })}
    </ul>
  );
}

export default TabList;
