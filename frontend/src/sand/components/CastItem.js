import React from 'react';

import './CastItem.css';

const CastItem = props => {
  return (
    <li className="cast-list__item">
      {props.src && (
        <img src={props.src} alt={`${props.name} as ${props.character}`} />
      )}
      <div className="cast-list__name">
        <h3>{props.name}</h3>
        <h4>
          <em>as</em> {props.character}
        </h4>
      </div>
    </li>
  );
};

export default CastItem;
