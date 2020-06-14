import React from 'react';
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
id,
onSave,
...props
}) {
  const { value: title, bind: bindTitle } = useInput(props.title || "");
  const { value: artist, bind: bindArtist } = useNonNativeInput(props.artist || {id: null, name: ""});
  const { value: tab, bind: bindTab } = useInput(props.tab || tabPlaceholder);
  const edit = !!id;

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
            readOnly={edit}
            {...bindArtist}
          />
        </div>
      </div>

      <div className="field tab">
        <TabEditor {...bindTab} />
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
