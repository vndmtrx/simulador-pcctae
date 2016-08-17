var path = require('path');

module.exports = {
  appBuild: path.resolve('build'),
  appHtml: path.resolve('index.html'),
  appPackageJson: path.resolve('package.json'),
  appSrc: path.resolve('src'),
  appNodeModules: path.resolve('node_modules'),
  ownNodeModules: path.resolve('node_modules')
};
