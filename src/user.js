const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name !!'],
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters !!'
    }
  },
  postCount: Number
});

const User = model('user', UserSchema);

module.exports = User;
