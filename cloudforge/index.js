const CloudForge = require('cloudforge');

// Directories are relative to root, as cloudforge is used from npm runnable commands.
module.exports = new CloudForge({
  server: {
    directory: './docs',
    browser: 'Google Chrome',
    port: 8585,
  },
  html: {
    sourceDirectory: './src/views',
    buildDirectory: './docs',
  },
  sass: {
    sourceDirectory: './src/sass',
    buildDirectory: './docs/css',
    includeSourceMap: true,
    outputStyle: 'nested',
  },
  dependencies: [
    ['./src/images', './docs/images'],
    ['./src/javascript', './docs/javascript'],
    ['./src/dependencies', './docs/dependencies'],
    ['./src/favicons', './docs/favicons'],
  ],
});
