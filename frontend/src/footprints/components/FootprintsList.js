import React from 'react';
import FootprintItem from './FootprintItem';

import './FootprintsList.css';

const FootprintsList = props => {
  return (
    <ul className="footprints-list">
      {props.footprints.map(footprint => (
        <FootprintItem
          key={footprint.id}
          title={footprint.title}
          image={footprint.image}
          date={footprint.date}
          season_number={footprint.season_number}
          episode_number={footprint.episode_number}
          episode_title={footprint.episode_title}
          director={footprint.director}
          release_year={footprint.release_year}
          user_name={footprint.user.display_name}
          user_image={footprint.user.image}
        />
      ))}
    </ul>
  );
};

export default FootprintsList;
