const fs = require('fs');

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Footprint = require('../models/footprint');
const User = require('../models/user');

const getFootprints = async (req, res, next) => {
  let footprints;
  try {
    footprints = await Footprint.find({});
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  res.json(footprints.map(footprint => footprint.toObject({ getters: true })));
};

const getFootprintById = async (req, res, next) => {
  const footprintId = req.params.pid;

  let footprint;

  try {
    footprint = await Footprint.findById(footprintId);
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  if (!footprint) {
    const error = new HttpError(
      'Could not find a footprint for the provided id.',
      404
    );
    return next(error);
  }

  res.json({
    footprint: footprint.toObject({ getters: true }),
  });
};

const getFootprintsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let footprints;
  let userWithFootprints;
  try {
    // footprints = await Footprint.find({ creator: userId });
    userWithFootprints = await User.findById(userId).populate('footprints');
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  // if (!footprints || footprints.length < 1) {
  if (!userWithFootprints || userWithFootprints.footprints.length < 1) {
    return next(
      new HttpError(
        'Could not find any footprint for the provided user id.',
        404
      )
    );
  }

  res.json({
    footprints: userWithFootprints.footprints.map(footprint =>
      footprint.toObject({ getters: true })
    ),
  });
};

const getMyFootprintsByTmdbId = async (req, res, next) => {
  const { userId } = req.userData;
  const { type, tmdbId } = req.params;

  // let footprints;
  let footprints;
  try {
    // footprints = await Footprint.find({ creator: userId });
    footprints = await Footprint.find({
      user: userId,
      type,
      tmdbId,
    });
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  res.json({
    footprints: footprints.map(footprint =>
      footprint.toObject({ getters: true })
    ),
  });
};

const createFootprint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid input.', 422));
  }

  const { type, tmdbId, seasonNumber, episodeNumber, userId } = req.body; // this made available via app.use(bodyParser.json()); at app.js

  const footprintUserId = req.userData ? req.userData.userId : userId;

  const createdFootprint = new Footprint({
    type,
    tmdbId,
    seasonNumber,
    episodeNumber,
    date: new Date(),
    user: footprintUserId,
  });

  let user;

  try {
    user = await User.findById(footprintUserId);
  } catch (err) {
    const error = new HttpError('There is no user with the ID provided!', 422);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('There is no user with the ID provided!', 422);
    return next(error);
  }

  try {
    /**
     * Here we use mongoose's session to
     * try 2 seperate things and if ony of them fails
     * we'll revert back.
     */
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdFootprint.save({ session: sess });
    user.footprints.push(createdFootprint);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating footprint failed!', 500);
    return next(error);
  }

  res.status(201).json({ footprint: createdFootprint });
};

const updateFootprint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid input.', 422);
    return next(error);
  }

  const { title, description } = req.body;
  const footprintId = req.params.pid;

  let footprint;

  try {
    footprint = await Footprint.findById(footprintId);
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  if (!footprint) {
    const error = new HttpError('There is no footprint found.', 422);
    return next(error);
  }

  if (footprint.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to do this.', 401);
    return next(error);
  }

  footprint.title = title;
  footprint.description = description;

  try {
    footprint = await footprint.save();
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  res.status(200).json({ footprint: footprint.toObject({ getters: true }) });
};

const deleteFootprint = async (req, res, next) => {
  const footprintId = req.params.pid;

  let footprint;

  try {
    footprint = await Footprint.findById(footprintId).populate('creator');
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  if (!footprint) {
    const error = new HttpError('There is no footprint found.', 422);
    return next(error);
  }

  if (footprint.creator.id !== req.userData.userId) {
    const error = new HttpError('You are not allowed to do this.', 401);
    return next(error);
  }

  const imagePath = footprint.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await footprint.remove({ session: sess });
    footprint.creator.footprints.pull(footprint);
    await footprint.creator.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: 'Footprint deleted.' });
};

exports.getFootprints = getFootprints;
exports.getFootprintById = getFootprintById;
exports.getFootprintsByUserId = getFootprintsByUserId;
exports.getMyFootprintsByTmdbId = getMyFootprintsByTmdbId;
exports.createFootprint = createFootprint;
exports.updateFootprint = updateFootprint;
exports.deleteFootprint = deleteFootprint;
