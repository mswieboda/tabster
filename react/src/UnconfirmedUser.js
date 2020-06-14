import React, { useState } from 'react';
import { sendNewConfirmation } from './apis/user';
import TextInput from './TextInput';

function UnconfirmedUser() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  const onSend = event => {
    event.preventDefault();

    sendNewConfirmation(email).then(response => {
      const data = response.data;

      if (data) {
        setShowForm(false);
      }
    }).catch(error => {
      const data = error.response.data;

      if (data) {
        console.log(data.message);
      }
    });
  };

  if (!showForm) {
    return(
      <div>
        click the link sent to your email
        <br />
        to confirm your email and account
        <br />
        or
        <span
          className="link-primary"
          onClick={() => setShowForm(true)}
        >
          send another one
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSend}>
      <div className="field">
        <TextInput
          type="text"
          name="email"
          required
          placeholder="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <span className="field">
          <input
            type="submit"
            className="btn-primary"
            value="send"
          />
        </span>
      </div>
    </form>
  );
}

export default UnconfirmedUser;
