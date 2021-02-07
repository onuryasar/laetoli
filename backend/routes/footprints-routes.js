const express = require('express');
const { check } = require('express-validator');

const footprintsController = require('../controllers/footprints-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', footprintsController.getFootprints);
// router.get('/:pid', footprintsController.getFootprintById);

// router.get('/user/:uid', footprintsController.getFootprintsByUserId);

/** Any route after this middleware will be behind this check */
router.use(checkAuth);

router.get(
  '/my/:type/:tmdbId',
  [
    check('type')
      .not()
      .isEmpty(),
    check('tmdbId')
      .not()
      .isEmpty(),
  ],
  footprintsController.getMyFootprintsByTmdbId
);
router.post(
  '/',
  [
    check('type')
      .not()
      .isEmpty(),
    check('tmdbId')
      .not()
      .isEmpty(),
  ],
  footprintsController.createFootprint
);
// router.patch(
//   '/:pid',
//   [
//     check('title')
//       .not()
//       .isEmpty(),
//     check('description').isLength({ min: 5 }),
//   ],
//   footprintsController.updateFootprint
// );
// router.delete('/:pid', footprintsController.deleteFootprint);

module.exports = router;
