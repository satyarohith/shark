'use strict';
const {
  callMatchingMethod,
  DoAPI,
  spinner,
  calculateCostAndHours
} = require('../util');
const List = require('../prompts/list');
const chalk = require('chalk');
const Action = require('./init');

module.exports.init = async () => {
  try {
    let answers = await List.init();
    callMatchingMethod(module.exports, answers.list);
  } catch (error) {
    console.error(error);
  }
};

module.exports.domains = async () => {
  try {
    spinner.start('Loading domains...');
    let data = await DoAPI.domainsGetAll();
    spinner.stop();
    if (data.body.meta.total === 0) {
      console.log("You don't have any domains");
    } else {
      data.body.domains.map((domain, index) => {
        console.log(
          chalk.gray(index + 1 + '. ') + chalk.bold.underline(domain.name)
        );
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.droplets = async () => {
  try {
    spinner.start('Loading Droplets...');
    let list = await DoAPI.dropletsGetAll();
    spinner.stop();
    if (list.body.droplets.length === 0) {
      console.log("You don't have any droplets");
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

        const ipAdrs =
          droplet.networks.v4.length > 0
            ? droplet.networks.v4[0].ip_address
            : droplet.networks.v6[0].ip_address;
        console.log('----------------------');
        console.log(chalk.bold('       Name:'), chalk.blue(droplet.name));
        console.log(chalk.bold('         Id:'), droplet.id);
        console.log(chalk.bold('     Memory:'), droplet.memory);
        console.log(chalk.bold('      Image:'), droplet.image.slug);
        console.log(chalk.bold('     Status:'), droplet.status);
        console.log(chalk.bold('     Region:'), droplet.region.name);
        console.log(
          chalk.bold('         Ip:'),
          ipAdrs || 'not available yet'
        );
        console.log(chalk.bold('Total Hours:'), calData.totalHours);
        console.log(
          chalk.bold('         CE:'),
          calData.totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })
        );
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.ssh_keys = async () => {
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
    spinner.stop();
    console.error(error.message);
  }
};

module.exports.floating_ips = async () => {
  try {
    spinner.start('Loading your floating_ips...');
    let data = await DoAPI.floatingIpsGetAll();
    spinner.stop();
    if (data.body.meta.total === 0) {
      console.log("You don't have any floating_ips under your account");
    } else {
      console.log('floatingIps assigned to region');
      data.body.floating_ips.map((ip, index) => {
        console.log(`${index + 1}. ${chalk.blue(ip.ip)} ${ip.region.name}`);
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
    let data = await DoAPI.volumes();
    spinner.stop();
    if (data.body.meta.total === 0) {
      console.log("You don't have any Volumes under your account");
    } else {
      data.body.volumes.map((volume, index) => {
        console.log(
          `${index + 1}. ${chalk.green(volume.name)} ${volume.region.slug} ${
            volume.size_gigabytes
          }GB ${volume.filesystem_type ? volume.filesystem_type : ''}`
        );
        console.log(
          `${chalk.blue('desc:')} ${volume.description} ${chalk.blue(
            'created_at:'
          )} ${volume.created_at}`
        );
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
    let data = await DoAPI.loadBalancers();
    spinner.stop();
    if (data.body.meta.total === 0) {
      console.log("You don't have any Load Balancers under your account");
    } else {
      data.body.load_balancers.map((load_balancer, index) => {
        console.log(
          `${index + 1}. ${chalk.green(load_balancer.name)} ${
            load_balancer.region.slug
          }  IP:${load_balancer.ip}`
        );
        console.log(
          `${chalk.blue('droplets:')}
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
    await Action.Init();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.exit = () => process.exit();
