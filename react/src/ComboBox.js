import React, { useEffect, useRef, useState } from 'react';
import { useOnBlur } from './hooks/useOnBlur';
import { FaTimesCircle as CloseIcon } from 'react-icons/fa';

import './ComboBox.scss';

function ComboBox({
  value: valueProp = "",
  items: itemsProp = [],
  icon,
  required,
  placeholder,
  onChange,
  onSelect,
  clearButton = true,
  clearButtonIcon = <CloseIcon />,
  renderItem,
  highlightOnTabKeyDown = false,
  valueChangeOnHighlight = false,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [items, setItems] = useState(itemsProp);
  const [value, setValue] = useState(valueProp);
  const ref = useRef();
  const iconComponent = icon && React.cloneElement(icon, {...icon.props, className: icon.props.className ? icon.props.className + " icon" : "icon"});

  useEffect(() => {
    setItems(itemsProp);
  }, [itemsProp]);

  const onInputChange = event => {
    const value = event.target.value;

    setValue(value);
    setSelectedIndex(null);

    onChange(value);
  };

  const onClear = () => {
    setValue("");
    onItemsClear();
  };

  const onItemsClear = () => {
    setItems([]);
    setSelectedIndex(null);
  };

  const onItemSelect = item => {
    if (item) {
      onItemHighlight(item);
      onSelect(item);
      onItemsClear();
    }
  };

  const onItemHighlight = item => {
    if (item && valueChangeOnHighlight) {
      setValue(valueChangeOnHighlight(item));
    }
  };

  const onKeyDown = event => {
    if (event.keyCode === 40) {
      // down
      event.preventDefault();

      if (!items.length) return;

      let newSelectedIndex = (!selectedIndex && selectedIndex !== 0) || selectedIndex === items.length - 1 ? 0 : selectedIndex + 1;
      // debugger;
      setSelectedIndex(newSelectedIndex);

      onItemHighlight(items[newSelectedIndex]);
    } else if (event.keyCode === 38) {
      // up
      event.preventDefault();

      if (!items.length) return;

      let newSelectedIndex = !selectedIndex || selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;

      setSelectedIndex(newSelectedIndex);

      onItemHighlight(items[newSelectedIndex]);
    } else if (event.keyCode === 13) {
      // enter/return
      event.preventDefault();

      onItemSelect(items[selectedIndex]);
    } else if (event.keyCode === 9) {
      // tab
      if (highlightOnTabKeyDown) {
        if (selectedIndex || selectedIndex === 0) {
          onItemSelect(items[selectedIndex]);
        } else {
          event.preventDefault();

          let newSelectedIndex = selectedIndex || 0;

          setSelectedIndex(newSelectedIndex);

          onItemHighlight(items[newSelectedIndex]);
        }
      } else {
        onItemsClear();
      }
    } else if (event.keyCode === 27) {
      // esc/escape
      onItemsClear();
    }
  };

  useOnBlur(ref, onItemsClear);

  return (
    <div className="combo-box" ref={ref} onKeyDown={onKeyDown}>
      <div className="combo-box-input-container">
        {iconComponent}
        <input
          type="text"
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        {clearButton &&
          <button
            className={`combo-box-clear ${value === "" ? "hidden" : ""}`}
            type="reset"
            onClick={onClear}
          >
            {clearButtonIcon}
          </button>
        }
      </div>
      { items && !!items.length &&
        <ul className="combo-box-items">
          {items.map((item, index) => {
            const highlighted = selectedIndex === index;

            return (
              <li
                key={index}
                onClick={() => onItemSelect(item)}
                className={`combo-box-item${highlighted ? ' highlighted' : ''}`}
              >
                {renderItem && renderItem(item, index, highlighted)}
                {!renderItem && item.label}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}

export default ComboBox;
