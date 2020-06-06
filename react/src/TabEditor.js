import React, { useState } from 'react';

import './TabEditor.scss';

function tabToLines(tab) {
  return tab.split('\n');
}

function TabEditor({tab}) {
  const [tabLines] = useState(tabToLines(tab));

  return (
    <div className="tab-editor">
      {
        tabLines.map(tabLine => {
          return (
            <pre>
              {tabLine}
            </pre>
          )
        })
      }
    </div>
  );
}

export default TabEditor;
