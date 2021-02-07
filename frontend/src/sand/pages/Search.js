import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './Search.css';
import SearchResultsList from '../components/SearchResultsList';

const Search = () => {
  const history = useHistory();
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState();
  const [isResults, setIsResults] = useState(false);
  const [results, setResults] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery) {
      try {
        const fetchSearchResults = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/sand/search/${searchQuery}`,
            );
            setIsResults(true);
            setResults(responseData);
          } catch (err) {}
        };
        fetchSearchResults();
      } catch (err) {}
    } else {
      setIsResults(false);
    }
  }, [sendRequest, searchQuery]);

  const [formState, inputHandler] = useForm(
    {
      query: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  const searchSubmitHandler = event => {
    event.preventDefault();
    const newSearchQuery = formState.inputs.query.value;
    history.push(`/search/${newSearchQuery}`);
    setSearchQuery(newSearchQuery);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <CSSTransition
        in={!isResults}
        timeout={200}
        classNames="search-form-with-results"
        mountOnEnter
      >
        <form className="search-form" onSubmit={searchSubmitHandler}>
          <Input
            id="query"
            element="input"
            label="Add a Footprint"
            placeholder="Search for a tv show / movie"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter at least 3 characters"
            onInput={inputHandler}
            initialValue={query || ''}
            initialIsValid={query && query.length > 3}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Search
          </Button>
        </form>
      </CSSTransition>

      {!isLoading && isResults && <SearchResultsList items={results} />}
    </React.Fragment>
  );
};

export default Search;
