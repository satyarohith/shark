const Delete = require('../inquirer/delete');
const { DoAPI, spinner } = require('../util');

module.exports = {
  init: async () => {
    let answers = await Delete.init();
    switch (answers.delete) {
      case 'droplet':
        module.exports.droplet();
        break;
      case 'domain':
        module.exports.domain();
        break;
      case 'token':
        module.exports.token();
      default:
        break;
    }
  },
  droplet: async () => {
    let answers = await Delete.droplet();
    spinner.start('Deleting your droplet..');
    DoAPI.dropletsDelete(answers.droplet_id)
      .then(data => {
        spinner.stop();
        if (data.response.statusCode === 204) {
          console.log(
            `Droplet ${answers.droplet_id} has been deleted successfully!`
          );
        }
      })
      .catch(err => {
        console.log('An Error occurred while deleting your droplet:', err);
      });
  },
  domain: async () => {
    let answers = await Delete.domain();
    spinner.start('Deleting your domain...');
    DoAPI.domainsDelete(answers.domain_name)
      .then(data => {
        spinner.stop();
        if ((data.response.statusCode = 204)) {
          console.log(`${answers.domain_name} has been successfully removed!`);
        }
      })
      .catch(err =>
        console.log(`An ${err.id} occurred. Please refer ${err.message}`)
      );
  },
  token: () => {
    if (config.has('do_api_access_token')) {
      config.delete('do_api_access_token');
      console.log(
        `${chalk.red('AccessToken')} Successfully Removed from your System!`
      );
    } else {
      console.log(chalk.red('You do not have any access tokens to remove'));
    }
  }
};
