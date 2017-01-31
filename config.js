var path = require('path');

module.exports = {
  port: process.env.PORT || 8000,
  raiz: __dirname,
  bower_dir: path.join(__dirname, '/lib/'),
  src_dir: path.join(__dirname, '/src/'),
  dist_dir: path.join(__dirname, '/dist/'),
};
