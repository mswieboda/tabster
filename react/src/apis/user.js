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

export {
  getUser,
  signIn,
  signUp,
  signOut,
};
