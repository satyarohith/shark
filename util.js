'use strict';
const DigitalOcean = require('do-wrapper').default;
const chalk = require('chalk');
const Create = require('./inquirer/create');
const CacheConf = require('cache-conf');
const Ora = require('ora');
const config = new CacheConf();

module.exports = {
  initAccount: async () => {
    const verifyAccount = async accesstoken => {
      try {
        const DoAPI = new DigitalOcean(accesstoken, 5);
        module.exports.spinner.start('Verifying your account...');
        let data = await DoAPI.account();
        let account = data.body.account;
        if (account) {
          module.exports.spinner.succeed('Account verified!');
          config.set('do_api_access_token', accesstoken);
          console.log(`
          ${chalk.green('Hi! Your access token is valid.')}
          Email: ${account.email}
          Droplet Limit: ${account.droplet_limit}
          Floating IP Limit: ${account.floating_ip_limit}
          `);
        }
      } catch (error) {
        module.exports.spinner.fail('Verification failed!');
        console.error(`
          ${chalk.red('Please make sure you are using a valid access token')}
          `);
      }
    };

    if (!config.has('do_api_access_token')) {
      let answers = await Create.accessToken();
      // If token is valid verifAccount sets the token
      await verifyAccount(answers.do_api_access_token);
    }
  },
  DoAPI: (() => {
    const ACCESS_TOKEN = config.get('do_api_access_token');
    return new DigitalOcean(ACCESS_TOKEN, 10);
  })(),
  spinner: (() => new Ora())(),
  config: config,
  callMatchingMethod: (object, method) => {
    if (object.hasOwnProperty(method)) {
      object[method]();
    } else if (object.hasOwnProperty('init')) {
      object.init();
    } else {
      console.error(
        `Couldn\'t find the method/property ${method} in ${object} `
      );
    }
  }
};
