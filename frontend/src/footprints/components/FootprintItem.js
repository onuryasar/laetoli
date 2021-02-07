import React from 'react';

import './FootprintItem.css';

const FootprintItem = props => {
  return (
    <li className="footprint-item">
      <div className="footprint-item__images">
        <img src={props.image} alt={props.title} />
        <img
          src={props.user_image}
          alt={props.user_name}
          className="user-image"
        />
      </div>
      <div className="footprint-item__content">
        {props.user_name} watched <strong>{props.title}</strong>
        {props.release_year && ` (${props.release_year})`}
        {props.season_number && `, season ${props.season_number}`}
        {props.episode_number && ` episode ${props.episode_number}`}
        {props.episode_title && ` "${props.episode_title}"`}
        {props.director && `, a movie by ${props.director}`}
        <pre>{props.date.toString().substr(0, 21)}</pre>
      </div>
    </li>
  );
};

export default FootprintItem;
