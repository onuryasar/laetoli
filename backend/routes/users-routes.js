const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.post(
  '/signup',
  //   fileUpload.single('image'), // 'image' is the expected input key of the file in the incoming request
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signUp
);
router.post('/login', usersController.logIn);

module.exports = router;
