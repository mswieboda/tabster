import React, { createContext, useEffect, useReducer, useState } from 'react';
import { getUser } from '../apis/user';

// Initial state
const initialState = {
  isLoggedIn: false,
  email: null,
  username: null
};

const UserContext = createContext(initialState);

// Reducer
function userReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        isLoggedIn: true,
        email: action.email,
        username: action.username,
      };
    case 'logout':
      return initialState;
    default:
      return state;
  }
}

function UserProvider(props) {
  const [user, dispatch] = useReducer(userReducer, initialState);
  const userData = { user, dispatch };
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    // check if logged in, get current user
    if (userChecked || (user && user.isLoggedIn)) return;

    setUserChecked(true);

    getUser().then(response => {
      const data = response.data;

      if (data) {
        dispatch({ type: "login", ...data });
      }
    }).catch(error => {
      const data = error.response.data;
      console.log(data.message);
    });
  }, [userChecked, user]);

  return <UserContext.Provider value={userData} {...props} />;
}

export {
  UserContext,
  UserProvider,
};
