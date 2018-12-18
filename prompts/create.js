'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const {
  loadAvailableRegions,
  loadAvailableSizes,
  loadAvailableImages,
  loadAvailableSSHKEYS,
  loadAvailableDroplets
} = require('../loaders');

module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'create',
      message: 'What do you want to create?',
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

module.exports.accessToken = () => {
  const questions = [
    {
      type: 'input',
      message: chalk.yellow('Please provide your access token:'),
      name: 'do_api_access_token'
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.droplet = async () => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What should we call your Droplet?'
    },
    {
      type: 'list',
      name: 'image',
      message: 'Which Distribution do you want to use?',
      choices: await loadAvailableImages()
    },
    {
      type: 'list',
      name: 'size',
      message: 'How stronger your computer should be?',
      choices: await loadAvailableSizes()
    },
    {
      type: 'list',
      name: 'region',
      message: 'Choose your data center!',
      choices: await loadAvailableRegions()
    },
    {
      type: 'checkbox',
      name: 'dropletAddOps',
      message: 'Add any additional options',
      choices: [
        new inquirer.Separator(' == Additional Options == '),
        {
          name: 'Private networking',
          value: 'private_networking'
        },
        {
          name: 'IPv6',
          value: 'ipv6'
        },
        {
          name: 'Monitoring',
          value: 'monitoring'
        }
      ]
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Add any droplet tags',
      filter: input => {
        const tags = input
          .trim()
          .replace('.', '_') // `tags` donot support `.` so replace them
          .split(' ');
        return tags;
      }
    },
    {
      type: 'checkbox',
      name: 'ssh_keys',
      message: 'Select your SSH keys',
      choices: await loadAvailableSSHKEYS()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.ssh_key = () => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Give a name to your key:'
    },
    {
      type: 'input',
      name: 'public_key',
      message: 'Paste your public key:'
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.floating_ip = async () => {
  const questions = [
    {
      type: 'list',
      name: 'region_slug',
      message: 'Select the region where floating_ip has to be reserved',
      choices: await loadAvailableRegions()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.snapshot = async () => {
  const questions = [
    {
      type: 'list',
      name: 'droplet',
      message: 'Select of which droplet you want to create a snapshot',
      choices: await loadAvailableDroplets()
    },
    {
      type: 'input',
      name: 'snapshot_name',
      message: 'Input your Snapshot Name'
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.volume = async () => {
  const questions = [
    {
      type: 'input',
      name: 'volume_name',
      message: 'Input your Volume Name'
    },
    {
      type: 'input',
      name: 'volume_size',
      message: 'Enter your volume size in GB',
      filter: input => {
        const size = parseInt(input, 10);
        return size;
      }
    },
    {
      type: 'input',
      name: 'volume_desc',
      message: 'Any description about your volume?'
    },
    {
      type: 'list',
      name: 'volume_region',
      message: 'Select volume region',
      choices: await loadAvailableRegions()
    }
  ];

  return inquirer.prompt(questions);
};
