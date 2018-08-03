const inquirer = require('inquirer');
const chalk = require('chalk');
const {
  loadDomains,
  loadAvailableRegions,
  loadAvailableSizes,
  loadAvailableImages,
  loadAvailableSSHKEYS
} = require('./loaders');

module.exports = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'create',
        message: 'What do you want to create?',
        choices: [
          { name: 'Droplet', value: 'droplet' },
          { name: 'Spaces', value: 'spaces' },
          { name: 'Domain', value: 'domain' },
          { name: 'SSH Key', value: 'ssh_key' }
        ]
      }
    ];

    return inquirer.prompt(questions);
  },
  accessToken: () => {
    const questions = [
      {
        type: 'input',
        message: chalk.yellow('Please provide your access token:'),
        name: 'do_api_access_token'
      }
    ];

    return inquirer.prompt(questions);
  },
  domain: () => {
    const questions = [
      {
        type: 'input',
        name: 'domain_name',
        message: 'Enter your domain name:',
        filter: input => input.toLowerCase()
      }
    ];
    return inquirer.prompt(questions);
  },
  droplet: async (DoAPI, spinner) => {
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
        choices: await loadAvailableImages(DoAPI, spinner)
      },
      {
        type: 'list',
        name: 'size',
        message: 'How stronger your computer should be?',
        choices: await loadAvailableSizes(DoAPI, spinner)
      },
      {
        type: 'list',
        name: 'region',
        message: 'Choose your data center!',
        choices: await loadAvailableRegions(DoAPI, spinner)
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
          let tags = input.split(' ');
          return tags;
        }
      },
      {
        type: 'checkbox',
        name: 'ssh_keys',
        message: 'Select your SSH keys',
        choices: await loadAvailableSSHKEYS(DoAPI, spinner)
      }
    ];

    return inquirer.prompt(questions);
  },
  sshkey: () => {
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
  },
  domainRecord: async (DoAPI, spinner) => {
    const questions = [
      {
        type: 'list',
        name: 'name',
        message: 'Domain Name:',
        choices: await loadDomains(DoAPI, spinner)
      }
    ];

    return inquirer.prompt(questions);
  }
};
