/* eslint-disable */
const withImages = require('next-images');
const copyRobots = require('./config/copy-robots');

copyRobots(process.env.BUILD_ENV);

module.exports = withImages({
  reactStrictMode: true,
  env: {
    BUILD_ENV: process.env.BUILD_ENV
  }
});
