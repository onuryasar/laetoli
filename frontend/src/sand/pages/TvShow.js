import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import SandHeaderImage from '../components/SandHeaderImage';
import MediaTypeLabel from '../../shared/components/UIElements/MediaTypeLabel';

import './SandDetails.css';
import CastList from '../components/CastList';
import Seasons from '../components/Seasons';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TvShow = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [tvDetails, setTvDetails] = useState();
  const [myFootprints, setMyFootprints] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (id) {
      try {
        const fetchTvDetails = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/sand/mote/tv/${id}`,
            );
            setTvDetails(responseData);
          } catch (err) {}
        };
        fetchTvDetails();
      } catch (err) {}
    } else {
      setTvDetails();
    }
  }, [sendRequest, id]);

  useEffect(() => {
    if (id && auth.isLoggedIn) {
      try {
        const fetchMyFootprints = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/footprints/my/tv/${id}`,
              'GET',
              null,
              {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
              },
            );
            setMyFootprints(responseData.footprints);
          } catch (err) {}
        };
        fetchMyFootprints();
      } catch (err) {}
    }
  }, [sendRequest, id, auth]);

  return (
    <div className="sand-details tv-show-details">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}

      {!isLoading && tvDetails && (
        <div>
          <SandHeaderImage
            src={`https://image.tmdb.org/t/p/w1280${tvDetails.backdrop_path}`}
            title={tvDetails.name}
            date={`(${tvDetails.first_air_date.substr(0, 4)} - ${
              tvDetails.in_production
                ? '...'
                : tvDetails.last_air_date.substr(0, 4)
            })`}
          />
          <div className="sand-details__main">
            <div className="sand-detail__poster">
              <img
                src={`https://image.tmdb.org/t/p/w342${tvDetails.poster_path}`}
                alt={tvDetails.name}
              />
            </div>
            <div className="sand-detail__description">
              <MediaTypeLabel media_type="tv" />
              <span className="number-of-seasons">
                {tvDetails.number_of_seasons} season
                {tvDetails.number_of_seasons > 1 && 's'}
              </span>
              <h2>About</h2>
              <p>{tvDetails.overview}</p>
              <h2>Stars</h2>
              <CastList items={tvDetails.credits.cast.slice(0, 4)} />
            </div>
          </div>
          <Seasons
            id={tvDetails.id}
            items={tvDetails.seasons}
            myFootprints={myFootprints}
          />
        </div>
      )}
    </div>
  );
};

export default TvShow;
