const { DoAPI, spinner } = require('../util');
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
      case 'ssh_keys':
        module.exports.sshKeys();
        break;
      default:
        break;
    }
  },
  domains: async () => {
    try {
      spinner.start('Loading domains...');
      let data = await DoAPI.domainsGetAll();
      spinner.stop();
      if (data.body.meta.total === 0) {
        console.log("You don't have any domains");
      } else {
        data.body.domains.map((domain, index) => {
          console.log(`${index + 1}. ${domain.name}`);
        });
      }
    } catch (error) {
      console.log(`
      An error ocurred while fetching your domains.
      ${error.id} : ${error.message}`);
    }
  },
  droplets: async () => {
    try {
      spinner.start('Loading Droplets...');
      let list = await DoAPI.dropletsGetAll();
      spinner.stop();
      if (list.body.droplets.length === 0) {
        console.log("You don't have any droplets");
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
    } catch (error) {
      console.log(`
      An error ocurred while fetching your droplets.
      ${error.id} : ${error.message}`);
    }
  },
  sshKeys: async () => {
    try {
      spinner.start('Loading sshkeys...');
      let data = await DoAPI.accountGetKeys();
      spinner.stop();
      if (data.body.meta.total === 0) {
        console.log("You don't have any keys under your account");
      } else {
        data.body.ssh_keys.map((key, index) => {
          console.log(`${index + 1}. ${key.name}  id: ${key.id}`);
        });
      }
    } catch (error) {
      console.log(`
      An error ocurred while fetching your sshkeys.
      ${error.id} : ${error.message}`);
    }
  }
};
