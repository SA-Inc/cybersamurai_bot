'use strict';

const configs = require(`${__dirname}/mongodb.json`);
const mongoose = require('mongoose');

const onTerminate = () => {
  mongoose.connection.close(() => {
    console.log('INFO', `Close MongoDB Connection`);
    process.exit(0);
  });
}

mongoose.connect(process.env.MONGODB_URL, configs.mongodb.options);

mongoose.connection.on('connected', () => {
  console.log('INFO', `Mongoose connected to: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.db.databaseName}`);
});

mongoose.connection.on('reconnect', () => {
  console.log('INFO', `MongoDB reconnected`);
});

mongoose.connection.on('timeout', () => {
  console.log('INFO', `MongoDB timeout`);
});

mongoose.connection.on('error', (err) => {
  console.log('INFO', `Failed to Connect MongoDB: ${err}`);
  // process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  console.log('INFO', `MongoDB Disconnected`);
});

require(`${__dirname}/user.js`);
require(`${__dirname}/message.js`);

process.on('SIGINT', onTerminate).on('SIGTERM', onTerminate);
