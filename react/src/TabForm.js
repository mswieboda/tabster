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
  const [insertMode, setInsertMode] = useState(true);

  const onToggleOverwrite = event => {
    event.preventDefault();

    setInsertMode(!insertMode);
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
          className={`btn-primary ${insertMode ? '' : 'toggled'}`}
          onClick={onToggleOverwrite}
        >
          overwriting {`${insertMode ? 'OFF' : 'ON'}`}
        </button>
      </div>

      <div className="field tab">
        <TabEditor
          {...bindTab}
          insertMode={insertMode}
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
