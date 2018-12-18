'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const {
  loadAvailableDroplets,
  loadAvailableSnapshots,
  loadAvailableSSHKEYS,
  loadAvailableFloatingIps,
  loadAvailableVolumes
} = require('../loaders');

module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'delete',
      message: 'What do you want to Delete?',
      choices: [
        { name: 'Droplet', value: 'droplet' },
        { name: 'Snapshot', value: 'snapshot' },
        { name: 'Floating Ip', value: 'floating_ip' },
        { name: 'SSH Key', value: 'ssh_key' },
        { name: 'Volume', value: 'volume' },
        { name: '<- Back', value: 'back' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.droplet = async () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'droplets',
      message: 'Select the droplet you want to delete:',
      choices: await loadAvailableDroplets()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.snapshot = async () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'snapshots',
      message: 'Select the snapshot you want to delete:',
      choices: await loadAvailableSnapshots()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.ssh_key = async () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'ssh_keys',
      message: 'Select ssh_key you want to delete:',
      choices: await loadAvailableSSHKEYS()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.floating_ip = async () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'floating_ips',
      message: 'Select floating_ips you want to delete:',
      choices: await loadAvailableFloatingIps()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.volume = async () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'volumes',
      message: 'Select volumes you want to delete:',
      choices: await loadAvailableVolumes()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.confirmDelete = (name, defaultValue, customMessage) => {
  const questions = [
    {
      type: 'confirm',
      name: `delete_${name}`,
      message:
        /* eslint-disable-next-line operator-linebreak */
        customMessage ||
        chalk.red(`Are you sure about deleting above ${name}s?`),
      default: defaultValue || false
    }
  ];

  return inquirer.prompt(questions);
};
