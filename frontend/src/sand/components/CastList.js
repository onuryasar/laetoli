import React from 'react';

import './CastList.css';
import CastItem from './CastItem';

const CastList = props => {
  return (
    <ul className="cast-list">
      {props.items.map(cast => (
        <CastItem
          key={cast.id}
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
              : ''
          }
          name={cast.name}
          character={cast.character}
        />
      ))}
    </ul>
  );
};

export default CastList;
