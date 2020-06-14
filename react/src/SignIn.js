import React, { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { signIn } from './apis/user';
import UnconfirmedUser from './UnconfirmedUser';
import ForgotPassword from './ForgotPassword';
import TextInput from './TextInput';

function SignIn({history}) {
  const { dispatch: userDispatch } = useContext(UserContext);
  const [unconfirmed, setUnconfirmed] = useState(false);

  const onSubmit = event => {
    const formElements = event.target.elements;

    event.preventDefault();

    signIn({
      username: formElements.username.value,
      password: formElements.password.value,
    }).then(response => {
      const data = response.data;

      if (data) {
        userDispatch({ type: "login", ...data });
        history.push("/tabs");
      }
    }).catch(error => {
      const data = error.response.data;

      if (data) {
        console.log(data.message);

        if (data.message === "Unconfirmed email") {
          setUnconfirmed(true);
        }
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="centered">
      {unconfirmed && <UnconfirmedUser />}

      <div className="field">
        <TextInput
          type="text"
          name="username"
          required
          placeholder="username or email"
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
          value="sign in"
        />
      </div>
      <div className="field">
        <ForgotPassword />
      </div>
    </form>
  );
}

export default SignIn;
