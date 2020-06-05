import React from 'react';
import { useInput } from './hooks/useInput';

function NewTab() {
  const { value: title, bind: bindTitle } = useInput('');
  const { value: artist, bind: bindArtist } = useInput('');
  const { value: tab, bind: bindTab } = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`title: ${title}\nartist: ${artist}\ntab:\n${tab}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" {...bindTitle} required/>
      </div>

      <div>
        <label>Artist</label>
        <select {...bindArtist} required>
          <option></option>
          <option>Charli XCX</option>
          <option>+ New Artist</option>
        </select>
      </div>

      <div>
        <div>
          <label>Tab</label>
        </div>
        <textarea {...bindTab} required></textarea>
      </div>

      <div>
        <input type="submit" value="Save"/>
      </div>
    </form>
  );
}

export default NewTab;
