import React, { useState } from 'react';
import {
  useInput,
  useNonNativeInput,
} from './hooks/useInput';
import TextInput from './TextInput';
import ArtistInput from './ArtistInput';
import TabEditor from './TabEditor';

import './TabForm.scss';

const tabPlaceholder = `e|-------------
B|-------------
G|-------------
D|-------------
A|-------------
E|-------------
`;

function TabForm({
onSave,
...props
}) {
  const { value: title, bind: bindTitle } = useInput(props.title || "");
  const { value: artist, bind: bindArtist } = useNonNativeInput(props.artist || {id: null, name: ""});
  const { value: tab, bind: bindTab } = useNonNativeInput(props.tab || tabPlaceholder);
  const [codeMirrorInstance, setCodeMirrorInstance] = useState(null);
  const [overwriting, setOverwriting] = useState(false);

  const initialSetCodeMirrorInstance = instance => {
    setCodeMirrorInstance(instance);
    instance.on('beforeChange', onOverwritingBeforeChange);
  };

  const onToggleOverwrite = event => {
    event.preventDefault();

    const willBeOverwriting = !overwriting;

    setOverwriting(willBeOverwriting);
    codeMirrorInstance.toggleOverwrite(willBeOverwriting);
  };

  const onOverwritingBeforeChange = (editor, data) => {
    if (!editor.state.overwrite) return;

    const { from, to, cancel, origin } = data;
    const deleting = origin === "+delete";
    const selecting = from.line !== to.line || to.ch - from.ch > (deleting && from.sticky === 1 ? 1 : 0);

    if (deleting && !selecting) {
      const lines = editor.doc.children[0].lines;
      const line = lines[from.line].text;
      const lastChar = line.charAt(from.ch);
      const cursorMovementOnly = from.ch === 0 || ['-', '\n', '', '|'].indexOf(lastChar) > -1;

      cancel();

      if (cursorMovementOnly) {
        if (lastChar === '-') {
          editor.execCommand('goColumnLeft');
        }
      } else {
        editor.doc.replaceRange("-", from, to);
        editor.execCommand('goColumnLeft');
      }
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    return onSave({title, artist, tab});
  };

  return(
    <form onSubmit={onSubmit} className="tab-form">
      <div className="meta-input">
        <div className="field">
          <TextInput
            required
            placeholder="tab song title"
            {...bindTitle}
          />
        </div>

        <div className="field">
          <ArtistInput
            required
            placeholder="artist of song"
            {...bindArtist}
          />
        </div>
      </div>

      <div className="field">
        <button
          className={`btn-primary ${overwriting ? 'toggled' : ''}`}
          onClick={onToggleOverwrite}
        >
          overwriting {`${overwriting ? 'ON' : 'OFF'}`}
        </button>
      </div>

      <div className="field tab">
        <TabEditor
          {...bindTab}
          overwriting={overwriting}
          codeMirrorInstance={codeMirrorInstance}
          setCodeMirrorInstance={initialSetCodeMirrorInstance}
        />
      </div>

      <div className="field">
        <input
          className="btn-primary"
          type="submit"
          value="save"
        />
      </div>
    </form>
  );
}

export default TabForm;
