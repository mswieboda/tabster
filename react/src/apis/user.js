import axios from 'axios';

const getUser = () => {
  return axios.get('/api/user');
};

const signIn = ({
  username,
  password
}) => {
  return axios.post('/api/sign_in', {
    username,
    password
  });
};

const signUp = ({
  email,
  username,
  password
}) => {
  return axios.post('/api/sign_up', {
    email,
    username,
    password
  });
};

const signOut = () => {
  return axios.delete('/api/sign_out');
};

const sendNewConfirmation = email => {
  return axios.post('/api/user/new_confirmation_email', { email });
}

const sendForgotPassword = email => {
  return axios.post('/api/user/send_forgot_password', { email });
}

const resetPassword = ({
  email,
  token,
  password
}) => {
  return axios.post('/api/user/reset_password', {
    email,
    token,
    password
  });
}

export {
  getUser,
  signIn,
  signUp,
  signOut,
  sendNewConfirmation,
  sendForgotPassword,
  resetPassword,
};
