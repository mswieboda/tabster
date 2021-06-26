import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import './codemirror-tabster.scss';
import './TabEditor.scss';

function TabEditor({value, onChange, insertMode}) {
  const onBeforeChange = (editor, data, _value) => {
    let { to, text, origin } = data;
    let { line, ch } = to;
    let lines = value.split('\n');

    text = text.join('');
    text = text === '' ? '\n' : text;

    // TODO: doesn't work with selections, need to use `from`

    if (origin === "+input") {
      let nextChar = lines[line].charAt(ch);
      let overwrite = !insertMode && nextChar === '-' && text !== "-" && text !== '\n';

      lines[line] = lines[line].substr(0, ch) + text + lines[line].substr(ch + (overwrite ? 1 : 0));
    } else if (origin === "+delete") {
      if (ch === 0) {
        lines[line - 1] += lines[line];
        lines.splice(line, 1);
      } else {
        let prevChar = lines[line].charAt(ch - 1);
        let deleteAsDash = !insertMode && prevChar !== '-';

        lines[line] = lines[line].substr(0, ch - 1) + (deleteAsDash ? '-' : '') + lines[line].substr(ch);
      }
    }

    onChange(lines.join('\n'));
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
