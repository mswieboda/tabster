import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import './codemirror-tabster.scss';
import './TabEditor.scss';

function TabEditor({value, onChange, insertMode}) {
  const onBeforeChange = (editor, data, _value) => {
    let { text } = data;
    const { to, origin } = data;
    const { line, ch } = to;
    const lines = value.split('\n');
    const deleting = origin === "+delete";
    // NOTE: length + 1 to account for '\n' which isn't included in `ch`
    const priorToCursorLineLengths = lines.slice(0, line).map(line => line.length + 1);
    const cursorIndex = priorToCursorLineLengths.reduce((a, b) => a + b, ch);

    // squash the array to string
    text = text.join('');
    // prep for return/backspace
    text = text === '' ? '\n' : text;

    // TODO: doesn't work with selections, need to use `from`
    // TODO: broken when deleting the `\n` in overwrite mode, off by 1
    let nextChar = value.charAt(cursorIndex);
    let overwrite = deleting || (!insertMode && nextChar === '-' && text !== '-' && text !== '\n');

    if (deleting) {
      text = insertMode || value.charAt(cursorIndex - 1) === '-' ? '' : '-';
    }

    const newValue = value.substring(0, cursorIndex - (deleting ? 1 : 0)) +
      text + value.substring(cursorIndex + (overwrite && !deleting ? 1 : 0));

    onChange(newValue);
  }

  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'null',
        theme: 'tabster',
        lineNumbers: false
      }}
      onBeforeChange={onBeforeChange}
    />
  );
}

export default TabEditor;
