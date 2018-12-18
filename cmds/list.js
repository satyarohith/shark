'use strict';
const chalk = require('chalk');
const {
  callMatchingMethod,
  DoAPI,
  spinner,
  calculateCostAndHours
} = require('../util');
const list = require('../prompts/list');
const action = require('./init');

module.exports.init = async () => {
  try {
    const answers = await list.init();
    callMatchingMethod(module.exports, answers.list);
  } catch (error) {
    console.error(error);
  }
};

module.exports.droplets = async () => {
  try {
    spinner.start('Loading Droplets...');
    const list = await DoAPI.dropletsGetAll();
    spinner.stop();
    if (list.body.droplets.length === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any droplets');
    } else {
      console.log(
        `You have ${chalk.magenta(list.body.meta.total)} ${
          list.body.meta.total > 1 ? 'Droplets' : 'Droplet'
        }`
      );
      list.body.droplets.map(droplet => {
        const calData = calculateCostAndHours(
          droplet.created_at,
          droplet.size.price_hourly
        );

        const IPv4 = droplet.networks.v4[0]
          ? droplet.networks.v4[0].ip_address
          : '';
        const privateIPv4 = droplet.networks.v4[1]
          ? droplet.networks.v4[1].ip_address
          : '';
        const IPv6 = droplet.networks.v6[0]
          ? droplet.networks.v6[0].ip_address
          : '';
        /* eslint-disable indent */
        return console.log(
          `----------------------
${chalk.bold('       Name:')} ${chalk.blue(droplet.name)}
${chalk.bold('         Id:')} ${droplet.id}
${chalk.bold('     Memory:')} ${droplet.memory}
${chalk.bold('      Image:')} ${droplet.image.slug}
${chalk.bold('     Status:')} ${droplet.status}
${chalk.bold('     Region:')} ${droplet.region.name}
${chalk.bold('       IPv4:')} ${IPv4 || 'not available yet'}
${chalk.bold('privateIPv4:')} ${privateIPv4 || 'not available'}
${chalk.bold('       IPv6:')} ${IPv6 || 'not available'}
${chalk.bold('Total Hours:')} ${calData.totalHours}
${chalk.bold('         CE:')} ${calData.totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
          `
        );
        /* eslint-enable  */
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.snapshots = async () => {
  try {
    spinner.start('Loading Snapshot...');
    const list = await DoAPI.snapshots();
    spinner.stop();
    if (list.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any snapshots');
    } else {
      console.log(
        `You have ${chalk.magenta(list.body.meta.total)} ${
          list.body.meta.total > 1 ? 'Snapshots' : 'Snapshot'
        }`
      );
      list.body.snapshots.map(snapshot => {
        /* eslint-disable indent */
        return console.log(
          `----------------------
${chalk.bold('        Name:')} ${chalk.blue(snapshot.name)}
${chalk.bold('          Id:')} ${snapshot.id}
${chalk.bold('  Created at:')} ${snapshot.created_at}
${chalk.bold('Ressource Id:')} ${snapshot.resource_id}
${chalk.bold('        Size:')} ${snapshot.size_gigabytes}
${chalk.bold('     Regions:')} ${snapshot.regions}
          `
        );
        /* eslint-enable  */
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.ssh_keys = async () => {
  try {
    spinner.start('Loading sshkeys...');
    const data = await DoAPI.accountGetKeys();
    spinner.stop();
    if (data.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any keys under your account');
    } else {
      data.body.ssh_keys.map((key, index) => {
        return console.log(`${index + 1}. ${key.name}  id: ${key.id}`);
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.floating_ips = async () => {
  try {
    spinner.start('Loading your floating_ips...');
    const data = await DoAPI.floatingIpsGetAll();
    spinner.stop();
    if (data.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any floating_ips under your account');
    } else {
      console.log('floatingIps assigned to region');
      data.body.floating_ips.map((ip, index) => {
        return console.log(
          `${index + 1}. ${chalk.blue(ip.ip)} ${ip.region.name}`
        );
      });
    }
  } catch (error) {
    spinner.stop();
    console.log(error.message);
  }
};

module.exports.volumes = async () => {
  try {
    spinner.start('Loading your volumes...');
    const data = await DoAPI.volumes();
    spinner.stop();
    if (data.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any Volumes under your account');
    } else {
      data.body.volumes.map((volume, index) => {
        return console.log(
          /* eslint-disable indent */
          `${index + 1}. ${chalk.green(volume.name)} ${volume.region.slug} ${
            volume.size_gigabytes
          }GB ${volume.filesystem_type ? volume.filesystem_type : ''}
          ${chalk.blue('desc:')} ${volume.description} ${chalk.blue(
            'created_at:'
          )} ${volume.created_at}`
        );
        /* eslint-disable enable */
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.loadbalancers = async () => {
  try {
    spinner.start('Loading your Load Balancers...');
    const data = await DoAPI.loadBalancers();
    spinner.stop();
    if (data.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any Load Balancers under your account');
    } else {
      data.body.load_balancers.map((load_balancer, index) => {
        return console.log(
          `${index + 1}. ${chalk.green(load_balancer.name)} ${
            load_balancer.region.slug
          }  IP:${load_balancer.ip}
          ${chalk.blue('droplets:')}
           ${load_balancer.droplet_ids}`
        );
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.back = async () => {
  try {
    return await action.init();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.exit = () => process.exit();
