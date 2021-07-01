import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import './codemirror-tabster.scss';
import './TabEditor.scss';

function TabEditor({value, onChange, insertMode}) {
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
    const deleting = origin === "+delete";
    const [fromIndex, toIndex] = [getSelectionIndex(from, lines), getSelectionIndex(to, lines)];
    const selecting = toIndex - fromIndex > (deleting ? 1 : 0);
    const textDataStr = textData.join('');
    let text = textDataStr === '' ? '\n' : textDataStr;
    let overwriting = deleting || !insertMode;

    // TODO: overwriting same char (- with another -, or x for x etc) doesn't move the cursor
    if (overwriting) {
      const selectionOrCharAtCursor = value.substring(fromIndex, toIndex);
      const allDashes = selectionOrCharAtCursor.split('').every(char => char === '-');

      overwriting = !selecting && allDashes && text !== '-' && text !== '\n' && value.charAt(toIndex) !== '\n';
    }

    // TODO: deleting and clearing with same char (- with another -) doesn't move the cursor
    if (deleting) {
      const lastChar = value.charAt(toIndex - 1);
      const deleteWithDash = !selecting && ['-', '\n'].indexOf(lastChar) === -1;

      text = !insertMode && deleteWithDash ? '-' : '';
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
      onBeforeChange={onBeforeChange}
    />
  );
}

export default TabEditor;
