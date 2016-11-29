var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'Dejaview-darwin-x64', 'Dejaview.app', 'Contents', 'MacOS', 'Dejaview');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'Dejaview-linux-x64', 'Dejaview');
      default:
        throw 'Unsupported platform';
    }
  }
};
