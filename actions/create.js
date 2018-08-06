'use strict';
const Create = require('../inquirer/create');
const { DoAPI, spinner, callMatchingMethod } = require('../util');
const chalk = require('chalk');

module.exports = {
  init: async () => {
    let answers = await Create.init();
    callMatchingMethod(module.exports, answers.create);
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
      spinner.stop();
      console.error(error.message);
    }
  },
  droplet: async () => {
    try {
      let answers = await Create.droplet(DoAPI, spinner);
      spinner.start(`Creating ${answers.name}...`);
      // The below omits property dropletAddOps
      let { dropletAddOps, tags, ...dropletconfig } = answers;
      if (tags[0].length > 0) {
        dropletconfig.tags = tags;
      }
      if (answers.hasOwnProperty('dropletAddOps')) {
        answers.dropletAddOps.map(option => {
          dropletconfig[option] = true;
        });
      }
      console.log(dropletconfig);
      let data = await DoAPI.dropletsCreate(dropletconfig);
      let droplet = data.body.droplet;
      spinner.stop();
      if (droplet.name) {
        console.log(`Created ${droplet.name}! and its id is ${droplet.id}`);
      }
    } catch (error) {
      spinner.stop();
      console.error(error.message);
    }
  },
  ssh_key: async () => {
    try {
      answers = await Create.ssh_key();
      spinner.start('Adding your key...');
      let data = await DoAPI.accountAddKey(answers);
      spinner.stop();
      if (data.body.ssh_key.id) {
        console.log(
          `SSH_KEY: ${chalk.green(
            data.body.ssh_key.name
          )} with Id: ${chalk.blue(
            data.body.ssh_key.id
          )} has been succesfully created!`
        );
      }
    } catch (error) {
      spinner.stop();
      console.error(`${error.message}`);
    }
  }
};
