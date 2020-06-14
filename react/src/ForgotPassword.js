import React, { useState } from 'react';
import { sendForgotPassword } from './apis/user';
import TextInput from './TextInput';

function ForgotPassword() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");

  const onSendForgotPassword = event => {
    event.preventDefault();

    sendForgotPassword(email).then(response => {
      const data = response.data;

      if (data) {
        setShowForgotPassword(false);
      }
    }).catch(error => {
      const data = error.response.data;

      if (data) {
        console.log(data.message);
      }
    });
  };

  if (!showForgotPassword) {
    return(
      <span className="field">
        <span
          className="link-primary"
          onClick={() => setShowForgotPassword(true)}
        >
          forgot password?
        </span>
      </span>
    );
  }

  return(
    <span className="field">
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
          onClick={onSendForgotPassword}
        />
      </span>
    </span>
  );
}

export default ForgotPassword;
