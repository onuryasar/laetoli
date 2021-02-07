import React from 'react';

import './SearchResultItem.css';
import { Link } from 'react-router-dom';
import MediaTypeLabel from '../../shared/components/UIElements/MediaTypeLabel';

const SearchResultItem = props => {
  const relativeUrl = `/${
    props.media_type === 'tv' ? 'tv-show' : props.media_type
  }/${props.id}`;
  return (
    <li>
      <div className="search-results-list__item-image">
        <Link to={relativeUrl}>
          {props.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w154${props.poster_path}`}
              alt={props.title}
            />
          )}
        </Link>
      </div>
      <div className="search-results-list__item-description">
        <Link to={relativeUrl}>
          <h2>{props.title}</h2>
        </Link>
        <MediaTypeLabel media_type={props.media_type} />
        {props.date && props.date.substr(0, 4)}
        <p>{props.overview}</p>
        {props.media_type === 'tv' && (
          <Link to={relativeUrl} className="episode-list-button">
            EPISODE LIST
          </Link>
        )}
      </div>
    </li>
  );
};

export default SearchResultItem;
