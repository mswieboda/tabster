import React, { useState } from 'react';
import { signUp } from './apis/user';
import UnconfirmedUser from './UnconfirmedUser';
import TextInput from './TextInput';

function SignUp({history}) {
  const [signedUp, setSignedUp] = useState(false);

  const onSubmit = event => {
    const formElements = event.target.elements;

    event.preventDefault();

    signUp({
      email: formElements.email.value,
      username: formElements.username.value,
      password: formElements.password.value,
    }).then(response => {
      const data = response.data;

      if (data) {
        setSignedUp(true);
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  if (signedUp) {
    return <UnconfirmedUser />;
  }

  return (
    <form onSubmit={onSubmit} className="centered">
      <div className="field">
        <TextInput
          type="text"
          name="email"
          required
          placeholder="email"
        />
      </div>

      <div className="field">
        <TextInput
          type="text"
          name="username"
          required
          placeholder="username"
        />
      </div>

      <div className="field">
        <TextInput
          type="password"
          name="password"
          required
          placeholder="password"
        />
      </div>

      <div className="field">
        <input
          type="submit"
          className="btn-primary"
          value="sign up"
        />
      </div>
    </form>
  );
}

export default SignUp;
