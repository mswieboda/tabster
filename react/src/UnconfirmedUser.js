import React, { useState } from 'react';
import { sendNewConfirmation } from './apis/user';
import TextInput from './TextInput';

function UnconfirmedUser() {
  const [showUnconfirmedForm, setShowUnconfirmedForm] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState("");

  const onSendConfirmation = event => {
    event.preventDefault();

    sendNewConfirmation(unconfirmedEmail).then(response => {
      const data = response.data;

      if (data) {
        setShowUnconfirmedForm(false);
      }
    }).catch(error => {
      const data = error.response.data;

      if (data) {
        console.log(data.message);
      }
    });
  };

  return (
    <div className="field">
      {!showUnconfirmedForm &&
        <p>
          Please confirm your email, or{' '}
          <span
            className="link-primary"
            onClick={() => setShowUnconfirmedForm(true)}
          >
            send a new confirmation
          </span>
        </p>
      }
      {showUnconfirmedForm &&
        <div>
          <TextInput
            type="text"
            name="email"
            required
            placeholder="email"
            value={unconfirmedEmail}
            onChange={event => setUnconfirmedEmail(event.target.value)}
          />
          <span className="field">
            <input
              type="submit"
              className="btn-primary"
              value="send"
              onClick={onSendConfirmation}
            />
          </span>
        </div>
      }
    </div>
  );
}

export default UnconfirmedUser;
