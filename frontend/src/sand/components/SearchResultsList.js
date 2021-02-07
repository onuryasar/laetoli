import React from 'react';
import SearchResultItem from './SearchResultItem';

import './SearchResultsList.css';

const SearchResultsList = props => {
  return (
    <ul className="search-results-list">
      {props.items.map(item => (
        <SearchResultItem
          id={item.id}
          key={item.id}
          media_type={item.media_type}
          title={item.title || item.name}
          poster_path={item.poster_path}
          date={item.first_air_date || item.release_date}
          overview={item.overview}
        />
      ))}
    </ul>
  );
};

export default SearchResultsList;
