import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import './codemirror-tabster.scss';
import './TabEditor.scss';

function TabEditor({value, onChange}) {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'null',
        theme: 'tabster',
        lineNumbers: false
      }}
      onBeforeChange={(editor, data, value) => onChange({ target: { value: value } })}
    />
  );
}

export default TabEditor;
