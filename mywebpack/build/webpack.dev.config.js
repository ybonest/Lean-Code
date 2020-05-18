const path = require('path');

module.exports = {
  entry: './src/a.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
}