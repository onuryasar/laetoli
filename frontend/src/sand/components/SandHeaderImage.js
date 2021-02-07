import React from 'react';

import './SandHeaderImage.css';

const SandHeaderImage = props => {
  return (
    <div
      className="sand-detail__header-image"
      style={{ backgroundImage: `url(${props.src})` }}
    >
      <h1>
        {props.title} <span>{props.date}</span>
      </h1>
    </div>
  );
};

export default SandHeaderImage;
