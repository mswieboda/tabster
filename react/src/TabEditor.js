import React, { useState } from 'react';
import {UnControlled as CodeMirror} from 'react17-codemirror2';

import 'codemirror/lib/codemirror.css';
import './codemirror-tabster.scss';
import './TabEditor.scss';

function TabEditor({value, onChange, codeMirrorInstance, setCodeMirrorInstance}) {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'null',
        theme: 'tabster',
        lineNumbers: false,
        historyEventDelay: 500
      }}
      editorDidMount={setCodeMirrorInstance}
    />
  );
}

export default TabEditor;
