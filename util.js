const DigitalOcean = require('do-wrapper').default;
const chalk = require('chalk');
module.exports = {
  verifyAccount: (accesstoken, config) => {
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
  }
};
