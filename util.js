'use strict';
const DigitalOcean = require('do-wrapper').default;
const chalk = require('chalk');
const CacheConf = require('cache-conf');
const Ora = require('ora');

const config = new CacheConf();
const spinner = new Ora();
const ACCESS_TOKEN = config.get('do_api_access_token');
const DoAPI = new DigitalOcean(ACCESS_TOKEN, 50);

module.exports.config = config;

module.exports.spinner = spinner;

module.exports.DoAPI = DoAPI;

module.exports.initAccount = async () => {
  const verifyAccount = async accesstoken => {
    try {
      const DoAPI = new DigitalOcean(accesstoken, 5);
      spinner.start('Verifying your account...');
      const {
        body: { account }
      } = await DoAPI.account();

      if (account) {
        spinner.succeed('Account verified!');
        config.set('do_api_access_token', accesstoken);
        console.log(`
          ${chalk.green('Hi! Your access token is valid.')}
          Email: ${account.email}
          Droplet Limit: ${account.droplet_limit}
          Floating IP Limit: ${account.floating_ip_limit}
          `);
      }
    } catch (error) {
      spinner.fail('Verification failed!');
      console.error(`
          ${chalk.red('Please make sure you are using a valid access token')}
          `);
    }
  };
  const Create = require('./prompts/create');

  const answers = await Create.accessToken();
  // If token is valid verifAccount sets the token
  await verifyAccount(answers.do_api_access_token);
};

module.exports.callMatchingMethod = (object, method) => {
  if (Object.prototype.hasOwnProperty.call(object, method)) {
    object[method]();
  } else if (Object.prototype.hasOwnProperty.call(object, 'init')) {
    object.init();
  } else {
    console.error(`Couldn't find the method/property ${method} in ${object} `);
  }
};

module.exports.calculateCostAndHours = (createdAt, hourlyPrice) => {
  const createdDate = new Date(createdAt);
  const totalHours = Math.ceil(Math.abs(Date.now() - createdDate) / 36e5);
  const totalCost = totalHours * hourlyPrice;
  return { totalCost, totalHours };
};
