import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { signIn } from './apis/user';
import TextInput from './TextInput';

function SignIn() {
  const { dispatch: userDispatch } = useContext(UserContext);

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
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <TextInput
          type="text"
          name="username"
          placeholder="username or email"
        />
      </div>

      <div className="field">
        <TextInput
          type="password"
          name="password"
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
    </form>
  );
}

export default SignIn;
