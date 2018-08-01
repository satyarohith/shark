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
    try {
      let answers = await Delete.droplet();
      spinner.start('Deleting your droplet..');
      let data = await DoAPI.dropletsDelete(answers.droplet_id);
      spinner.stop();
      if (data.response.statusCode === 204) {
        console.log(
          `Droplet ${answers.droplet_id} has been deleted successfully!`
        );
      }
    } catch (error) {
      console.log('An Error occurred while deleting your droplet:', error);
    }
  },
  domain: async () => {
    try {
      let answers = await Delete.domain();
      spinner.start('Deleting your domain...');
      let data = await DoAPI.domainsDelete(answers.domain_name);
      spinner.stop();
      if ((data.response.statusCode = 204)) {
        console.log(`${answers.domain_name} has been successfully removed!`);
      }
    } catch (error) {
      spinner.stop();
      console.log(`${error.id} : ${error.message}`);
    }
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
