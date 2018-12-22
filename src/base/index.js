const {Command} = require('@oclif/command');
const DigitalOcean = require('do-wrapper').default;
const Conf = require('conf');
const config = new Conf();

class BaseCommand extends Command {
  constructor(...args) {
    super(...args);
  }

  async init() {
    let API_TOKEN = '';

    if (config.has('do_access_token')) {
      API_TOKEN = config.get('do_access_token');
    } else {
      const {askToken} = require('../prompts');
      const {token} = await askToken();
      await this.validateToken(token);
      this.setToken('do_access_token', token);
      API_TOKEN = token;
    }

    this.api = new DigitalOcean(API_TOKEN);
  }

  async validateToken(token) {
    try {
      const api = new DigitalOcean(token);
      const {
        body: {account}
      } = await api.account();
      if (account.status === 'active') {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  deleteToken(key) {
    config.delete(key);
  }

  setToken(key, value) {
    config.set(key, value);
  }

  // This peice of code is inspired by https://github.com/heroku/heroku-cli-util/blob/master/lib/styled.js
  styledJSON(data) {
    if (process.stdout.isTTY) {
      const cardinal = require('cardinal');
      const theme = require('cardinal/themes/jq');
      return cardinal.highlight(JSON.stringify(data, null, 2), {theme: theme});
    }
    return JSON.stringify(data, null, 2);
  }
}

module.exports = BaseCommand;
