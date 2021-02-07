import React, { useState, useContext } from 'react';

import './FootprintRecord.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';

const FootprintRecord = props => {
  const { type, tmdbId, seasonNumber, episodeNumber } = props;
  const [isInFootprints, setIsInFootprints] = useState(!!props.myFootprint);
  const [footprint, setFootprint] = useState(props.myFootprint);

  const auth = useContext(AuthContext);
  const { isLoading, error, errorCode, sendRequest, clearError } = useHttpClient();

  const addToFootprint = async () => {
    console.log('adding...');
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/footprints`,
        'POST',
        JSON.stringify({
          type,
          tmdbId,
          seasonNumber,
          episodeNumber,
          userId: auth.userId,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      );
      setIsInFootprints(true);
      setFootprint(responseData.footprint);
    } catch (err) {}
  };

  return isInFootprints && footprint ? (
    <div className="footprint-record">
      <span className="footprint-record__title">watched on&nbsp;</span> <span className="footprint-record__date">{footprint.date.substr(0,10)}</span>
    </div>
  ) : (
    <div className="footprint-button">
      {
        error && (
          <ErrorModal error={error} errorCode={errorCode} onClear={clearError} />
        )
      }
      {
        isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )
      }
      <button
        type="button"
        onClick={addToFootprint}
      >
        ADD TO <strong>MY FOOTPRINTS</strong>
      </button>
    </div>
  );
};

export default FootprintRecord;
