'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const {
  loadAvailableDroplets,
  loadAvailableDomains,
  loadAvailableSSHKEYS,
  loadAvailableFloatingIps
} = require('../loaders');
module.exports = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'delete',
        message: 'What do you want to Delete?',
        choices: [
          { name: 'Droplet', value: 'droplet' },
          { name: 'Floating Ip', value: 'floating_ip' },
          { name: 'Domain', value: 'domain' },
          { name: 'SSH Key', value: 'ssh_key' }
        ]
      }
    ];

    return inquirer.prompt(questions);
  },
  domain: async (DoAPI, spinner) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'domain_name',
        message: chalk.red('Select the domain you want to delete:'),
        choices: await loadAvailableDomains(DoAPI, spinner)
      }
    ];

    return inquirer.prompt(questions);
  },
  droplet: async (DoAPI, spinner) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'droplet_id',
        message: 'Select the droplet you want to delete:',
        choices: await loadAvailableDroplets(DoAPI, spinner)
      }
    ];

    return inquirer.prompt(questions);
  },
  ssh_key: async (DoAPI, spinner) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ssh_key_id',
        message: 'Select ssh_key you want to delete:',
        choices: await loadAvailableSSHKEYS(DoAPI, spinner)
      }
    ];

    return inquirer.prompt(questions);
  },
  floating_ip: async (DoAPI, spinner) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'floating_ip',
        message: 'Select floating_ips you want to delete:',
        choices: await loadAvailableFloatingIps(DoAPI, spinner)
      }
    ];

    return inquirer.prompt(questions);
  }
};
