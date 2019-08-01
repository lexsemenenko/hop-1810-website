const path = require('path');

module.exports = {
  mode: 'development',
  entry: [path.join(__dirname, '_src/js/', 'scripts.js')],
  output: {
    path: path.join(__dirname, './public/'),
    filename: '[name].js'
  },
}