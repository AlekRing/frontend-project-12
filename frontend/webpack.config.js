const path = require('path');

const config = {
  devServer: {
    static: path.join(__dirname, '/'),
    compress: true,
    // open: true,
    historyApiFallback: true,
    host: 'localhost',
  },
};

module.exports = () => config;
