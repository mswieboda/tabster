import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { UserContext } from './contexts/UserContext';
import { resetPassword } from './apis/user';
import TextInput from './TextInput';

function ResetPassword({location}) {
  const { dispatch: userDispatch } = useContext(UserContext);
  const { search } = useLocation();
  const { email, token } = queryString.parse(search);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [resetted, setResetted] = useState(false);

  const onSubmit = event => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      // TODO: error message/validation CSS etc
      return;
    }

    resetPassword({
      email: email,
      token: token,
      password: password,
    }).then(response => {
      const data = response.data;

      if (data) {
        userDispatch({ type: "login", ...data });
        setResetted(true);
      }
    }).catch(error => {
      const data = error.response.data;

      if (data) {
        console.log(data.message);
      }
    });
  };

  if (resetted) {
    return(
      <div>Password successfully reset, you have been signed in</div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <TextInput
          type="password"
          required
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="password"
        />
      </div>

      <div className="field">
        <TextInput
          type="password"
          required
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
          placeholder="confirmation"
        />
      </div>

      <div className="field">
        <input
          type="submit"
          className="btn-primary"
          value="reset"
        />
      </div>
    </form>
  );
}

export default ResetPassword;
