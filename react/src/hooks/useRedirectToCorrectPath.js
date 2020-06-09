import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useRedirectToCorrectPath(path) {
  const [redirectChecked, setRedirectChecked] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [isCorrectPath, setIsCorrectPath] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== path) {
      setRedirecting(true);
      window.location.assign(path + location.search);
    }

    setRedirectChecked(true);
  }, [location, path]);

  useEffect(() => {
    setIsCorrectPath(redirectChecked && !redirecting);
  }, [redirectChecked, redirecting]);

  return isCorrectPath;
}
