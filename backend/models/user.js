const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  //   image: { type: String, required: true },
  footprints: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Footprint' },
  ],
});

userSchema.plugin(uniqueValidator); // the unique flag in Schema only makes the field indexed, but not do the validation. so we need this extra plugin.

module.exports = mongoose.model('User', userSchema);
