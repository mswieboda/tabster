import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import useRedirect from './hooks/useRedirect';
import { signUp } from './apis/user';
import TextInput from './TextInput';

function SignUp() {
  const { dispatch: userDispatch } = useContext(UserContext);
  const { redirect, setRedirect, renderRedirect } = useRedirect(null);

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
        userDispatch({ type: "login", ...data });
        setRedirect('/');
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  };

  if (redirect) return renderRedirect();

  return (
    <form onSubmit={onSubmit}>
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
