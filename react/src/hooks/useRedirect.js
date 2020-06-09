import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function useRedirect(initialValue) {
  const [redirect, setRedirect] = useState(initialValue);

  const renderRedirect = () => {
    setRedirect(null);
    return <Redirect to={redirect} />;
  };

  return {
    redirect,
    setRedirect,
    renderRedirect,
  };
}
