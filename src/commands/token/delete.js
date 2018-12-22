const BaseCommand = require('../../base');

class TokenDeleteCommand extends BaseCommand {
  async run() {
    this.deleteToken('do_access_token');
    this.log('Access token deleted!');
  }
}

TokenDeleteCommand.description = 'Delete previously set access token';

module.exports = TokenDeleteCommand;
