import React from 'react';

import './Episode.css';
import FootprintRecord from '../../footprints/components/FootprintRecord';

const Episode = props => {
  return (
    <li className="season-episodes-list__item">
      <div className="episode-still">
        {props.still_src && (
          <img
            src={props.still_src}
            alt={`Season ${props.season} Episode ${props.number}`}
          />
        )}
        <h3>{`Season ${props.season} Episode ${props.number}`}</h3>
      </div>
      <div className="footprint-block">
        <FootprintRecord
          type="tv"
          tmdbId={props.tvId}
          seasonNumber={props.season}
          episodeNumber={props.number}
          myFootprint={props.myFootprint}
        />
      </div>
      <h4>{props.name}</h4>
      <p>{props.overview}</p>
    </li>
  );
};

export default Episode;
