var path = require('path');

module.exports = {
  entry: './src/webbluetooth.js',
  output: {
    filename: 'raunch-webbluetooth.js',
    path: path.resolve(__dirname, 'dist'),
    library: "RaunchWebBluetooth",
    libraryTarget: "umd"
  }
};
