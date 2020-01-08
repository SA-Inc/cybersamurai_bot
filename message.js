'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const messageSchema = new mongoose.Schema({
  chat_id: {
    type: Number,
  },
  date: {
    type: Date,
  },
  total_count: {
    type: Number,
    default: 0
  },
  text: {
    type: Number,
    default: 0
  },
  audio: {
    type: Number,
    default: 0
  },
  document: {
    type: Number,
    default: 0
  },
  photo: {
    type: Number,
    default: 0
  },
  sticker: {
    type: Number,
    default: 0
  },
  video: {
    type: Number,
    default: 0
  },
  voice: {
    type: Number,
    default: 0
  },
  contact: {
    type: Number,
    default: 0
  },
  location: {
    type: Number,
    default: 0
  },
  venue: {
    type: Number,
    default: 0
  },
  forward: {
    type: Number,
    default: 0
  },
  pinned_message: {
    type: Number,
    default: 0
  },
  game: {
    type: Number,
    default: 0
  },
  video_note: {
    type: Number,
    default: 0
  },
  poll: {
    type: Number,
    default: 0
  },
});

mongoose.model('Message', messageSchema, 'messages');
