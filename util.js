const DigitalOcean = require('do-wrapper').default;
const chalk = require('chalk');
const Create = require('./inquirer/create');
const pkg = require('./package.json');
const ConfigStore = require('configstore');
const Ora = require('ora');

const config = new ConfigStore(pkg.name);

module.exports = {
  initAccount: async () => {
    const verifyAccount = accesstoken => {
      const DoAPI = new DigitalOcean(accesstoken, 5);
      DoAPI.account()
        .then(data => {
          config.set('do_api_access_token', accesstoken);
          let account = data.body.account;
          console.log(`
        ${chalk.green('Hi! Your access token is valid.')}
        Email: ${account.email}
        Droplet Limit: ${account.droplet_limit}
        Floating IP Limit: ${account.floating_ip_limit}
        `);
        })
        .catch(() => {
          console.error(`
          ${chalk.red('Please make sure you are using a valid access token')}
          `);
        });
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
  spinner: (() => new Ora())()
};
