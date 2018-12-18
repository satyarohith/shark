'use strict';
const chalk = require('chalk');
const { callMatchingMethod, spinner, DoAPI, config } = require('../util');
const deletePrompts = require('../prompts/delete');
const action = require('./init');

module.exports.init = async () => {
  try {
    const answers = await deletePrompts.init();
    callMatchingMethod(module.exports, answers.delete);
  } catch (error) {
    console.error(error);
  }
};

module.exports.droplet = async () => {
  try {
    const answers = await deletePrompts.droplet();
    if (answers.droplets.length > 0) {
      const { delete_droplet } = await deletePrompts.confirmDelete('droplet');
      if (delete_droplet) {
        spinner.start('Deleting your droplet..');
        answers.droplets.map(async droplet => {
          try {
            const data = await DoAPI.dropletsDelete(droplet.id);
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
            console.error(error.message);
          }
        });
      }
    } else {
      console.log(
        'Please select atleast one droplet to perform this operation!'
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.snapshot = async () => {
  try {
    const answers = await deletePrompts.snapshot();
    if (answers.snapshots.length > 0) {
      const { delete_snapshot } = await deletePrompts.confirmDelete('snapshot');
      if (delete_snapshot) {
        spinner.start('Deleting your snapshot...');
        answers.snapshots.map(async snapshot => {
          try {
            const data = await DoAPI.snapshotsDeleteById(snapshot);
            if (data.response.statusCode === 204) {
              spinner.succeed(`${snapshot} is deleted!`);
            }
          } catch (error) {
            spinner.fail(`failed to delete ${snapshot}`);
            console.log(error.message);
          }
        });
      }
    } else {
      console.log(
        'Please select atleast one snapshot to perform this operation!'
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.ssh_key = async () => {
  try {
    const answers = await deletePrompts.ssh_key();
    if (answers.ssh_keys.length > 0) {
      const { delete_ssh_key } = await deletePrompts.confirmDelete('ssh_key');
      if (delete_ssh_key) {
        spinner.start('Deleting your key...');
        answers.ssh_keys.map(async ssh_key => {
          try {
            const data = await DoAPI.accountDeleteKey(ssh_key);
            if (data.response.statusCode === 204) {
              spinner.succeed(`${ssh_key} is deleted!`);
            }
          } catch (error) {
            spinner.fail(`failed to delete ${ssh_key}`);
            console.log(error.message);
          }
        });
      }
    } else {
      console.log(
        'Please select atleast one ssh_key to perform this operation!'
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.floating_ip = async () => {
  try {
    const answers = await deletePrompts.floating_ip();
    if (answers.floating_ips.length > 0) {
      const { delete_floating_ip } = await deletePrompts.confirmDelete(
        'floating_ip'
      );
      if (delete_floating_ip) {
        spinner.start('Deleting your key...');
        answers.floating_ips.map(async fip => {
          try {
            const data = await DoAPI.floatingIpsDelete(fip);
            if (data.response.statusCode === 204) {
              spinner.succeed(`${fip} is deleted!`);
            }
          } catch (error) {
            spinner.fail(`failed to delete ${fip}`);
            console.log(error.message);
          }
        });
      }
    } else {
      console.log(
        'Please select atleast one floating_ip to perform this operation!'
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.volume = async () => {
  try {
    const answers = await deletePrompts.volume();
    if (answers.volumes.length > 0) {
      const { delete_volume } = await deletePrompts.confirmDelete('volume');
      if (delete_volume) {
        spinner.start('Deleting your volume...');
        answers.volumes.map(async volumeid => {
          try {
            const data = await DoAPI.volumesDeleteById(volumeid);
            if (data.response.statusCode === 204) {
              spinner.succeed(`${volumeid} is deleted!`);
            }
          } catch (error) {
            spinner.fail(`failed to delete ${volumeid}`);
            console.log(error.message);
          }
        });
      }
    } else {
      console.log(
        'Please select atleast one volume to perform this operation!'
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.token = () => {
  if (config.has('do_api_access_token')) {
    config.delete('do_api_access_token');
    console.log('Access token Successfully Removed from your System!');
  } else {
    console.log(chalk.red('You do not have any access tokens to remove'));
  }
};

module.exports.back = async () => {
  try {
    await action.init();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.exit = () => process.exit();
