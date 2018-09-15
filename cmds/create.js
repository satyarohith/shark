'use strict';
const chalk = require('chalk');
const Create = require('../prompts/create');
const { callMatchingMethod, spinner, DoAPI } = require('../util');
const Action = require('./init');

module.exports.init = async () => {
  try {
    const answers = await Create.init();
    callMatchingMethod(module.exports, answers.create);
  } catch (error) {
    console.error(error);
  }
};

module.exports.domain = async () => {
  try {
    const answers = await Create.domain();
    spinner.start(`Creating ${answers.domain_name}...`);
    const data = await DoAPI.domainsCreate(answers.domain_name);
    if (data.body.domain.name) {
      spinner.succeed(`${chalk.bold(data.body.domain.name)} is created. 🎉`);
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.droplet = async () => {
  try {
    const answers = await Create.droplet();
    spinner.start(`Creating ${answers.name}...`);
    // The below omits property dropletAddOps and tags
    const { dropletAddOps, tags, ...dropletconfig } = answers;
    //  If there are any tags assign them to dropletconfig
    if (tags[0].length > 0) {
      dropletconfig.tags = tags;
    }
    if (Object.prototype.hasOwnProperty.call(answers, 'dropletAddOps')) {
      answers.dropletAddOps.map(option => {
        dropletconfig[option] = true;
        return dropletconfig;
      });
    }
    const data = await DoAPI.dropletsCreate(dropletconfig);
    const { droplet } = data.body;
    spinner.succeed(
      `${chalk.bold(droplet.name)} created at ${chalk.blue(
        droplet.region.name
      )}`
    );
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
    if (data.body.ssh_key.id) {
      spinner.succeed(
        `${chalk.green(data.body.ssh_key.name)} with Id: ${chalk.blue(
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
    const answers = await Create.floating_ip();
    spinner.start('Creating floating_ip..');
    // There are two ways to create floatingIps, we will create
    // using Region for now https://git.io/fAGUM
    const data = await DoAPI.floatingIpsAssignRegion(answers.region_slug);
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
    const answers = await Create.volume();
    spinner.start('Creating volume..');
    console.log(answers);
    const data = await DoAPI.volumesCreate({
      size_gigabytes: answers.volume_size,
      name: answers.volume_name,
      description: answers.volume_desc,
      region: answers.volume_region
    });
    if (data.body.volume) {
      spinner.succeed(`Volume ${chalk.blue(data.body.volume.name)} created!`);
      console.log(
        `  Name: ${data.body.volume.name}
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
