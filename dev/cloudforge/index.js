const CloudForge = require('cloudforge');

// Directories are relative to root, as cloudforge is used from npm runnable commands.
module.exports = new CloudForge({
  server: {
    directory: '../',
    browser: 'Google Chrome',
    port: 8585,
  },
  html: {
    sourceDirectory: './src/views',
    buildDirectory: '../',
  },
  sass: {
    sourceDirectory: './src/sass',
    buildDirectory: '../css',
    includeSourceMap: true,
    outputStyle: 'nested',
  },
  cleanIgnoreDirectories: ['../'],
  dependencies: [
    ['./src/images', '../images'],
    ['./src/javascript', '../javascript'],
    ['./src/dependencies', '../dependencies'],
    ['./src/favicons', '../favicons'],
  ],
});
