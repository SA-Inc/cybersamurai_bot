'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  is_bot: {
    type: Boolean,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
  },
  language_code: {
    type: String,
  },
  date: {
    type: Date,
    default: null,
  },
  send_msg: {
    type: Boolean,
    default: false,
  }
});

mongoose.model('User', userSchema, 'users');
