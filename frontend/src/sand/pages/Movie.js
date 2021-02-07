import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import SandHeaderImage from '../components/SandHeaderImage';
import MediaTypeLabel from '../../shared/components/UIElements/MediaTypeLabel';

import './SandDetails.css';
import CastList from '../components/CastList';
import FootprintRecord from '../../footprints/components/FootprintRecord';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Movie = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [myFootprints, setMyFootprints] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (id) {
      try {
        const fetchMovieDetails = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/sand/mote/movie/${id}`,
            );
            setMovieDetails(responseData);
          } catch (err) {}
        };
        fetchMovieDetails();
      } catch (err) {}
    } else {
      setMovieDetails();
    }
  }, [sendRequest, id]);

  useEffect(() => {
    if (id && auth.isLoggedIn) {
      try {
        const fetchMyFootprints = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/footprints/my/movie/${id}`,
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
    <div className="sand-details movie-details">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}

      {!isLoading && movieDetails && (
        <div>
          <SandHeaderImage
            src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
            title={movieDetails.title}
            date={`(${movieDetails.release_date.substr(0, 4)})`}
          />
          <div className="sand-details__main">
            <div className="sand-detail__poster">
              <img
                src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
              <div className="footprint-block">
                <FootprintRecord
                  type="movie"
                  tmdb_id={movieDetails.id}
                  myFootprint={myFootprints[0]}
                />
              </div>
            </div>
            <div className="sand-detail__description">
              <MediaTypeLabel media_type="movie" />
              <h2>About</h2>
              <p>{movieDetails.overview}</p>
              <h2>Stars</h2>
              <CastList items={movieDetails.credits.cast.slice(0, 4)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
