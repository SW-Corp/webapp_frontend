import React, { useState } from 'react';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/menu.png';

export const MainSidebar = () => {
  const [opened, setOpened] = useState(false);
  const buttonHandler = () => setOpened(!opened);

  const [choice, setChoice] = useState('option 1');
  function handleSelect(event) {
    setChoice(event.target.value);
  }

  return (
    <div>
      <div style={opened ? stylesOpened : styles}>
        <div style={functionStyles}>
          <label htmlFor="selectList" style={labelStyles}>
            Parametr 1
          </label>
          <select
            name="selectList"
            id="selectList"
            onChange={handleSelect}
            style={selectStyles}
          >
             {' '}
            <option value="option 1" style={optionStyles}>
              Option 1
            </option>
              <option value="option 2">Option 2</option>
          </select>
        </div>
      </div>
      <img title="icon" src={img} style={iconStyles} onClick={buttonHandler} />
    </div>
  );
};

const styles = {
  display: 'none',
};

const stylesOpened = {
  backgroundColor: colorConstants.lightGrey,
  color: colorConstants.black,
  position: 'absolute',
  width: '340px',
  height: '90vh',
  font: 'Roboto',
  fontSize: '20px',
  fontWeight: '400',
  marginTop: '75px',
} as React.CSSProperties;

const iconStyles = {
  position: 'absolute',
  color: colorConstants.white,
  width: '35px',
  height: '35px',
  marginTop: '20px',
  marginLeft: '20px',
} as React.CSSProperties;

const functionStyles = {
  paddingLeft: '6%',
  paddingRight: '6%',
  paddingTop: '30%',
};

const labelStyles = {
  fontWeight: '400',
  fontSize: '18px',
  paddingLeft: '10px',
};

const selectStyles = {
  backgroundColor: colorConstants.white,
  border: '2px solid',
  borderColor: colorConstants.darkGreen,
  borderRadius: '20px',
  width: '310px',
  height: '50px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  textIndent: '10px',
};

const optionStyles = {};
