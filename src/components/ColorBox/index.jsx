import React, { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {

};

// do ham nay doc lap nen viet ban ngoai function
function getRandomColor() {
  const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
  const randomIndex = Math.trunc(Math.random() * 5);
  return COLOR_LIST[randomIndex];
}

function ColorBox(props) {

  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('box_color' || 'deeppink');
    return initColor;
  });

  // ham nay co setColor nen viet ben trong function
  function handleBoxClick() {
    // get reandom color -> set color
    const newColor = getRandomColor();
    setColor(newColor);

    localStorage.setItem('box_color', newColor);
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
    ></div>
  );
}

export default ColorBox;