const Create = require('../inquirer/create');
const { DoAPI } = require('../util');

module.exports = {
  init: async () => {
    let answers = await Create.init();
    switch (answers.create) {
      case 'droplet':
        module.exports.droplet();
        break;
      case 'domain':
        module.exports.domain();
        break;
      default:
        break;
    }
  },
  domain: async () => {
    try {
      let answers = await Create.domain();
      spinner.start(`Creating ${answers.domain_name}...`);
      let data = await DoAPI.domainsCreate(answers.domain_name);
      spinner.stop();
      if (data.body.domain.name) {
        console.log(
          `Domain ${data.body.domain.name} has been successfully created. 🎉`
        );
      }
    } catch (error) {
      console.error(
        `An ${error.id} occurred. Please try a valid name ${error.message}`
      );
    }
  },
  droplet: async () => {
    try {
      droplet = await Create.droplet();
      spinner.start(`Creating ${droplet.name}...`);
      let data = await DoAPI.dropletsCreate(droplet);
      let droplet = data.body.droplet;
      spinner.stop();
      if (droplet.name) {
        console.log(`Created ${droplet.name}! and its id is ${droplet.id}`);
      }
    } catch (error) {
      console.error(
        `An ${error.id} occurred while creating droplet: ${error.message}`
      );
    }
  }
};
