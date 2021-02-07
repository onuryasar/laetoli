const axios = require('axios');

const HttpError = require('../models/http-error');

const getSearchResults = async (req, res, next) => {
  const { q } = req.params;
  const searchEndpoint = `https://api.themoviedb.org/3/search/multi?api_key=${
    process.env.TMDB_API_KEY
  }&language=en-GB&query=${encodeURI(q)}&page=1&include_adult=false`;

  const response = await axios.get(searchEndpoint);
  const { data } = response;

  if (!data) {
    const error = new HttpError('Could not get search results', 422);
    throw error;
  }

  res.json(data.results);
};

const getMoteDetails = async (req, res, next) => {
  const { type, tmdbId } = req.params;

  const moteEndpoint = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=credits`;

  const response = await axios.get(moteEndpoint);
  const { data } = response;

  if (!data) {
    const error = new HttpError('Could not get item details', 422);
    throw error;
  }

  res.json(data);
};

const getTvSeasonDetails = async (req, res, next) => {
  const { tmdbId, seasonNumber } = req.params;

  const moteEndpoint = `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const response = await axios.get(moteEndpoint);
  const { data } = response;

  if (!data) {
    const error = new HttpError('Could not get season details', 422);
    throw error;
  }

  res.json(data);
};

exports.getSearchResults = getSearchResults;
exports.getMoteDetails = getMoteDetails;
exports.getTvSeasonDetails = getTvSeasonDetails;
