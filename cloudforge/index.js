const CloudForge = require('cloudforge');

// Directories are relative to root, as cloudforge is used from npm runnable commands.
module.exports = new CloudForge({
  server: {
    directory: './build',
    browser: 'Google Chrome',
    port: 8585,
  },
  html: {
    sourceDirectory: './src/views',
    buildDirectory: './build',
  },
  sass: {
    sourceDirectory: './src/sass',
    buildDirectory: './build/css',
    includeSourceMap: true,
    outputStyle: 'nested',
  },
  dependencies: [
    ['./src/images', './build/images'],
    ['./src/javascript', './build/javascript'],
    ['./src/dependencies', './build/dependencies'],
    ['./src/favicons', './build/favicons'],
  ],
});
