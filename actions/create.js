'use strict';
const Create = require('../inquirer/create');
const { callMatchingMethod } = require('../util');
const chalk = require('chalk');
const Action = require('./init');

module.exports.init = async () => {
  try {
    let answers = await Create.init();
    callMatchingMethod(module.exports, answers.create);
  } catch (error) {
    console.error(error);
  }
};

module.exports.domain = async () => {
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
};

module.exports.droplet = async () => {
  try {
    let answers = await Create.droplet();
    spinner.start(`Creating ${answers.name}...`);
    // The below omits property dropletAddOps and tags
    let { dropletAddOps, tags, ...dropletconfig } = answers;
    // check the if there are any tags
    if (tags[0].length > 0) {
      dropletconfig.tags = tags;
    }
    if (answers.hasOwnProperty('dropletAddOps')) {
      answers.dropletAddOps.map(option => {
        dropletconfig[option] = true;
      });
    }
    let data = await DoAPI.dropletsCreate(dropletconfig);
    let droplet = data.body.droplet;
    spinner.succeed(droplet.name);
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.ssh_key = async () => {
  try {
    const answers = await Create.ssh_key();
    spinner.start('Adding your key...');
    const data = await DoAPI.accountAddKey(answers);
    spinner.stop();
    if (data.body.ssh_key.id) {
      console.log(
        `SSH_KEY: ${chalk.green(data.body.ssh_key.name)} with Id: ${chalk.blue(
          data.body.ssh_key.id
        )} has been succesfully created!`
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(`${error.message}`);
  }
};

module.exports.floating_ip = async () => {
  try {
    let answers = await Create.floating_ip();
    spinner.start('Creating floating_ip..');
    // There are two ways to create floatingIps, we will create
    // using Region for now https://git.io/fAGUM
    let data = await DoAPI.floatingIpsAssignRegion(answers.region_slug);
    if (data.body.floating_ip) {
      spinner.succeed(
        `floating ip ${chalk.blue(data.body.floating_ip.ip)} created!`
      );
      console.log(`region: ${data.body.floating_ip.region.name}`);
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.volume = async () => {
  try {
    let answers = await Create.volume();
    spinner.start('Creating volume..');
    console.log(answers);
    let data = await DoAPI.volumesCreate({
      size_gigabytes: answers.volume_size,
      name: answers.volume_name,
      description: answers.volume_desc,
      region: answers.volume_region
    });
    if (data.body.volume) {
      spinner.succeed(`Volume ${chalk.blue(data.body.volume.name)} created!`);
      console.log(
        `Name: ${data.body.volume.name}
         Desc: ${data.body.volume.description},
         Size: ${data.body.volume.size_gigabytes}GB
         Region: ${data.body.volume.region.slug}`
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.back = async () => {
  try {
    await Action.Init();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.exit = () => process.exit();
