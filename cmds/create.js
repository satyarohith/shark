'use strict';
const chalk = require('chalk');
const Create = require('../prompts/create');
const { callMatchingMethod, spinner, DoAPI } = require('../util');
const { init } = require('./init');

module.exports.init = async () => {
  try {
    const answers = await Create.init();
    callMatchingMethod(module.exports, answers.create);
  } catch (error) {
    console.error(error);
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
    const {
      body: { droplet }
    } = await DoAPI.dropletsCreate(dropletconfig);
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
    const {
      body: { ssh_key }
    } = await DoAPI.accountAddKey(answers);
    if (ssh_key.id) {
      spinner.succeed(
        `${chalk.green(ssh_key.name)} with Id: ${chalk.blue(
          ssh_key.id
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
    const {
      body: { floating_ip }
    } = await DoAPI.floatingIpsAssignRegion(answers.region_slug);
    if (floating_ip) {
      spinner.succeed(`floating ip ${chalk.blue(floating_ip.ip)} created!`);
      console.log(`region: ${floating_ip.region.name}`);
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.snapshot = async () => {
  try {
    const answers = await Create.snapshot();
    spinner.start('Creating snapshot..');
    const {
      body: { action }
    } = await DoAPI.dropletsRequestAction(
      answers.droplet.id,
      {
        type: 'snapshot',
        name: answers.snapshot_name
      }
    );

    if (action) {
      spinner.succeed('Snapshot is being created!');
    }
  } catch (error) {
    spinner.stop();
    console.log(error.message);
  }
};

module.exports.volume = async () => {
  try {
    const answers = await Create.volume();
    spinner.start('Creating volume..');
    console.log(answers);
    const {
      body: { volume }
    } = await DoAPI.volumesCreate({
      size_gigabytes: answers.volume_size,
      name: answers.volume_name,
      description: answers.volume_desc,
      region: answers.volume_region
    });

    if (volume) {
      spinner.succeed(`Volume ${chalk.blue(volume.name)} created!`);
      console.log(
        `  Name: ${volume.name}
           Desc: ${volume.description},
           Size: ${volume.size_gigabytes}GB
         Region: ${volume.region.slug}`
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.back = async () => {
  try {
    await init();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.exit = () => process.exit();
