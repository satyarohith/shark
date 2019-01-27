const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

try {
  updateNotifier({
    pkg
  }).notify({isGlobal: true});
} catch (error) {
  console.error('Error checking for updates:', error.message);
}

module.exports = require('@oclif/command');
