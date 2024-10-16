import React from 'react';
import './Dice.css';

function Dice({ number }) {
  const faceClass = numberToFaceClass(number);

  return (
    <div className="scene">
      <div className={`cube ${faceClass}`}>
        <div className="cube__face cube__face--front"></div>
        <div className="cube__face cube__face--back"></div>
        <div className="cube__face cube__face--right"></div>
        <div className="cube__face cube__face--left"></div>
        <div className="cube__face cube__face--top"></div>
        <div className="cube__face cube__face--bottom"></div>
      </div>
    </div>
  );
}

function numberToFaceClass(number) {
  switch (number) {
    case 1:
      return 'show-front';
    case 2:
      return 'show-bottom';
    case 3:
      return 'show-right';
    case 4:
      return 'show-left';
    case 5:
      return 'show-top';
    case 6:
      return 'show-back';
    default:
      return '';
  }
}

export default Dice;
