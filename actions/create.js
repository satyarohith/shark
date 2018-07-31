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
    let answers = await Create.domain();
    DoAPI.domainsCreate(answers.domain_name)
      .then(data => {
        if (data.body.domain.name) {
          console.log(
            `Domain ${data.body.domain.name} has been successfully created. 🎉`
          );
        }
      })
      .catch(err =>
        console.error(
          `An ${err.id} occurred. Please try a valid name ${err.message}`
        )
      );
  },
  droplet: async () => {
    droplet = await Create.droplet();
    console.log(droplet.tags);
    console.log(`Creating ${droplet.name}...`);
    DoAPI.dropletsCreate(droplet)
      .then(data => {
        let droplet = data.body.droplet;
        console.log(`Created ${droplet.name}! and its id is ${droplet.id}`);
      })
      .catch(error => {
        console.log(error);
        console.error(
          `An ${error.id} occurred while creating droplet: ${error.message}`
        );
      });
  }
};
