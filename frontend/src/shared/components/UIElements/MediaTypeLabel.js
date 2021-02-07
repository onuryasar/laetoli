import React from 'react';

import './MediaTypeLabel.css';

const MediaTypeLabel = props => {
  return (
    <span className="media-type-label">
      {props.media_type === 'tv' ? 'TV Show' : 'Movie'}
    </span>
  );
};

export default MediaTypeLabel;
