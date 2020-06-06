import { useEffect } from "react";

export const useOnBlur = (ref, onBlur) => {
  useEffect(() => {
    const handleClick = e => {
      if (ref.current.contains(e.target)) {
        // inside click
        return;
      }

      // outside click
      onBlur();
    };

    // add when mounted
    document.addEventListener("mousedown", handleClick);

    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onBlur]);
};
