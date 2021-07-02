import React, { useState } from 'react';
import {Controlled as CodeMirror} from 'react17-codemirror2';

import 'codemirror/lib/codemirror.css';
import './codemirror-tabster.scss';
import './TabEditor.scss';

function TabEditor({value, onChange, insertMode}) {
  const [instance, setInstance] = useState(null);

  const getSelectionIndex = (cursor, lines) => {
    // NOTE: mapping length + 1 to account for ending '\n' which isn't included in `ch`
    return lines
      .slice(0, cursor.line)
      .map(line => line.length + 1)
      .reduce((a, b) => a + b, cursor.ch);
  };

  const onBeforeChange = (editor, data, _value) => {
    const { text: textData, from, to, origin } = data;
    const lines = value.split('\n');
    const [fromIndex, toIndex] = [getSelectionIndex(from, lines), getSelectionIndex(to, lines)];
    const deleting = origin === "+delete";
    const textDataStr = textData.join('');
    const selecting = toIndex - fromIndex > (deleting && from.sticky === 1 ? 1 : 0);
    let text = !deleting && textDataStr === '' ? '\n' : textDataStr;
    let overwriting = !insertMode;

    if (overwriting) {
      const selectionOrCharAtCursor = value.substring(fromIndex, toIndex);
      const allDashes = selectionOrCharAtCursor.split('').every(char => char === '-');
      const nextChar = value.charAt(toIndex);

      overwriting = !selecting && allDashes && text !== '\n' && nextChar !== '\n';

      if (overwriting && nextChar === text) {
        instance.setCursor({ line: from.line, ch: from.ch + 1 });
        return;
      }
    }

    if (deleting) {
      const lastChar = value.charAt(toIndex - 1);
      const cursorMovementOnly = ['-', '\n', '', '|'].indexOf(lastChar) > -1;

      if (!selecting && !insertMode && cursorMovementOnly) {
        instance.setCursor({ line: to.line, ch: to.ch - (lastChar === '-' ? 1 : 0) });
        return;
      }

      text = !insertMode && !selecting ? '-' : '';
    }

    const newValue = value.substring(0, fromIndex - (overwriting && deleting ? 1 : 0)) +
      text + value.substring(toIndex + (overwriting && !deleting ? 1 : 0));

    onChange(newValue);
  };

  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'null',
        theme: 'tabster',
        lineNumbers: false
      }}
      editorDidMount={editor => { setInstance(editor) }}
      onBeforeChange={onBeforeChange}
    />
  );
}

export default TabEditor;
