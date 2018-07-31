const { DoAPI } = require('../util');
const List = require('../inquirer/list');

module.exports = {
  init: async () => {
    let answers = await List.init();
    switch (answers.list) {
      case 'domains':
        module.exports.domains();
        break;
      case 'droplets':
        module.exports.droplets();
        break;
      default:
        break;
    }
  },
  domains: () => {
    DoAPI.domainsGetAll()
      .then(data => {
        if (data.body.meta.total === 0) {
          console.log("You don't have any domains");
        }
        data.body.domains.map((domain, index) => {
          console.log(`${index + 1}. ${domain.name}`);
        });
      })
      .catch(error =>
        console.log(`
      There was an error while fetching your domains.
      ${error.id} : ${error.message}`)
      );
  },
  droplets: () => {
    DoAPI.dropletsGetAll().then(list => {
      if (list.body.droplets.length === 0) {
        console.log("Sorry you don't have any droplets");
      } else {
        console.log(`You have ${chalk.magenta(list.body.meta.total)} Droplets`);
        list.body.droplets.map(droplet => {
          console.log(
            `--------------------------------
    ${chalk.inverse('Name:')}   ${droplet.name}
    ${chalk.inverse('Id:')}     ${droplet.id}
    ${chalk.inverse('Memory:')} ${droplet.memory}
    ${chalk.inverse('Image:')}  ${droplet.image.slug}
    ${chalk.inverse('Status:')} ${droplet.status}
    ${chalk.inverse('Region:')} ${droplet.region.name}
             `
          );
        });
      }
    });
  }
};
