/* eslint-disable */
const path = require('path');
const fs = require('fs');

function copyFile(from, to) {
  fs.copyFile(from, to, (err) => {
    if (err) throw err;
  });
}

module.exports = function copyRobots(BUILD_ENV) {
  const DEV = path.join(__dirname, '../utils/robots/dev.txt');
  const PROD = path.join(__dirname, '../utils/robots/prod.txt');

  const SRC = BUILD_ENV === 'development' ? DEV : PROD;
  const PUBLIC = path.join(__dirname, '../public/robots.txt');

  copyFile(SRC, PUBLIC);
};
