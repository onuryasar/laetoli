const express = require('express');
const { check } = require('express-validator');

const sandController = require('../controllers/sand-controller');

const router = express.Router();

router.get('/search/:q', sandController.getSearchResults);

router.get('/mote/:type/:tmdbId', sandController.getMoteDetails);
router.get(
  '/mote/tv/:tmdbId/season/:seasonNumber',
  sandController.getTvSeasonDetails
);

/** Any route after this middleware will be behind this check */
// router.use(checkAuth);

module.exports = router;
