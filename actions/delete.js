'use strict';
const Delete = require('../inquirer/delete');
const { callMatchingMethod } = require('../util');
const chalk = require('chalk');

module.exports = {
  init: async () => {
    let answers = await Delete.init();
    callMatchingMethod(module.exports, answers.delete);
  },
  droplet: async () => {
    try {
      let answers = await Delete.droplet();
      spinner.start('Deleting your droplet..');
      //TODO: remove after figuring out how to handle this with inquirer
      if (answers.droplets.length === 0) {
        spinner.stop();
        console.error(chalk.red('Error:') + ' Please select a Droplet');
        process.exit();
      }
      answers.droplets.map(async droplet => {
        try {
          let data = await DoAPI.dropletsDelete(droplet.id);
          if (data.response.statusCode === 204) {
            spinner.succeed(
              `${chalk.green(droplet.name)} with Ip: ${chalk.red(
                droplet.ip
              )} is deleted!`
            );
          }
        } catch (error) {
          spinner.fail(
            `Failed to delete ${droplet.name} with Ip: ${droplet.ip}`
          );
          console.log(error);
        }
      });
    } catch (error) {
      spinner.stop();
      console.log('An Error occurred while deleting your droplet:', error);
    }
  },
  domain: async () => {
    try {
      let answers = await Delete.domain();
      spinner.start('Deleting your domain...');
      answers.domain_name.map(async domain => {
        try {
          let data = await DoAPI.domainsDelete(domain);
          if ((data.response.statusCode = 204)) {
            spinner.succeed(`${domain} is deleted`);
          }
        } catch (error) {
          spinner.fail(`failed to delete ${domain}`);
          console.log(error.message);
        }
      });
    } catch (error) {
      spinner.stop();
      console.log(`${error.id} : ${error.message}`);
    }
  },
  ssh_key: async () => {
    try {
      let answers = await Delete.ssh_key();
      spinner.start('Deleting your key...');
      answers.ssh_key_id.map(async ssh_key => {
        try {
          let data = await DoAPI.accountDeleteKey(ssh_key);
          if ((data.response.statusCode = 204)) {
            spinner.succeed(`${ssh_key} is deleted!`);
          }
        } catch (error) {
          spinner.fail(`failed to delete ${ssh_key}`);
          console.log(error.message);
        }
      });
    } catch (error) {
      spinner.stop();
      console.error(`${error.message}`);
    }
  },
  floating_ip: async () => {
    try {
      let answers = await Delete.floating_ip();
      spinner.start('Deleting your key...');
      answers.floating_ip.map(async fip => {
        try {
          let data = await DoAPI.floatingIpsDelete(fip);
          if ((data.response.statusCode = 204)) {
            spinner.succeed(`${fip} is deleted!`);
          }
        } catch (error) {
          spinner.fail(`failed to delete ${fip}`);
          console.log(error.message);
        }
      });
    } catch (error) {
      spinner.stop();
      console.error(`${error.message}`);
    }
  },
  volume: async () => {
    try {
      let answers = await Delete.volume();
      spinner.start('Deleting your volume...');
      answers.volumes.map(async volumeid => {
        try {
          let data = await DoAPI.volumesDeleteById(volumeid);
          if ((data.response.statusCode = 204)) {
            spinner.succeed(`${volumeid} is deleted!`);
          }
        } catch (error) {
          spinner.fail(`failed to delete ${volumeid}`);
          console.log(error.message);
        }
      });
    } catch (error) {
      spinner.stop();
      console.error(`${error.message}`);
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
