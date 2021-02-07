import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Episode from './Episode';

import './Seasons.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Seasons = props => {
  const { id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState();
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(1);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (id && selectedSeasonNumber) {
      try {
        const fetchTvSeasonDetails = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/sand/mote/tv/${id}/season/${selectedSeasonNumber}`,
            );
            setSelectedSeason(responseData);
          } catch (err) {}
        };
        fetchTvSeasonDetails();
      } catch (err) {}
    }
  }, [id, selectedSeasonNumber, setSelectedSeason, sendRequest]);

  const seasonNumberChangeHandler = event => {
    setSelectedSeasonNumber(event.target.dataset.season_number);
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && selectedSeason && (
        <div>
          <ul className="season-titles">
            <li>Seasons</li>
            {props.items.map(season => (
              <li
                key={season.id}
                className={`${selectedSeason &&
                  selectedSeason.season_number === season.season_number &&
                  'selected'}`}
              >
                <span
                  onClick={seasonNumberChangeHandler}
                  data-season_number={season.season_number}
                >
                  {season.season_number}
                </span>
              </li>
            ))}
          </ul>
          <ul className="season-episodes-list">
            {selectedSeason &&
              selectedSeason.episodes.map(episode => (
                <Episode
                  key={episode.id}
                  tvId={props.id}
                  season={episode.season_number}
                  number={episode.episode_number}
                  name={episode.name}
                  overview={episode.overview}
                  myFootprint={
                    props.myFootprints.filter(fp => {
                      return (
                        fp.seasonNumber === episode.season_number &&
                        fp.episodeNumber === episode.episode_number
                      );
                    })[0]
                  }
                  still_src={
                    episode.still_path &&
                    `https://image.tmdb.org/t/p/w300${episode.still_path}`
                  }
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Seasons;
