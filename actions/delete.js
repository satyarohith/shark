const Delete = require('../inquirer/delete');
const { DoAPI } = require('../util');

module.exports = {
  init: () => {
    console.log('Delete Init has been called!');
  },
  droplet: async () => {
    let answers = await Delete.droplet();
    DoAPI.dropletsDelete(answers.droplet_id)
      .then(data => {
        if (data.response.statusCode === 204) {
          console.log(
            `Droplet ${answers.droplet_id} has been deleted successfully!`
          );
        }
      })
      .catch(err => {
        console.log('An Error occurred while Creating droplet:', err);
      });
  },
  domain: async () => {
    let answers = await Delete.domain();
    DoAPI.domainsDelete(answers.domain_name)
      .then(data => {
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
