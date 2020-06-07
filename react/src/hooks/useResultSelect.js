// import { useEffect } from "react";

export const useResultSelect = ({
  results,
  selectedIndex,
  setSelectedIndex,
  onResultSelect = () => {},
  onResultClick = () => {},
  onResultsClear = () => {},
  tabToSelect = false,
}) => {
  return {
    onKeyDown: event => {
      if (event.keyCode === 40) {
        // down
        event.preventDefault();

        if (!results.length) return;

        let newSelectedIndex = (!selectedIndex && selectedIndex !== 0) || selectedIndex === results.length - 1 ? 0 : selectedIndex + 1;

        setSelectedIndex(newSelectedIndex);

        onResultSelect(results[newSelectedIndex]);
      } else if (event.keyCode === 38) {
        // up
        event.preventDefault();

        if (!results.length) return;

        let newSelectedIndex = !selectedIndex || selectedIndex === 0 ? results.length - 1 : selectedIndex - 1;

        setSelectedIndex(newSelectedIndex);

        onResultSelect(results[newSelectedIndex]);
      } else if (event.keyCode === 13) {
        // enter/return
        event.preventDefault();

        onResultClick();
      } else if (event.keyCode === 9) {
        // tab

        if (tabToSelect) {
          if (selectedIndex || selectedIndex === 0) {
            onResultClick();
          } else {
            event.preventDefault();

            let newSelectedIndex = selectedIndex || 0;

            setSelectedIndex(newSelectedIndex);

            onResultSelect(results[newSelectedIndex]);
          }
        } else {
          onResultsClear();
        }
      } else if (event.keyCode === 27) {
        // esc/escape
        onResultsClear();
      }
    }
  };
};
