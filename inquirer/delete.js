const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'delete',
        message: 'What do you want to Delete?',
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
  domain: () => {
    const questions = [
      {
        type: 'input',
        name: 'domain_name',
        filter: input => input.toLowerCase(),
        message: chalk.red('Enter the domain name')
      }
    ];

    return inquirer.prompt(questions);
  },
  droplet: () => {
    const questions = [
      {
        type: 'input',
        name: 'droplet_id',
        message: 'Enter the droplet id you want to delete:'
      }
    ];

    return inquirer.prompt(questions);
  },
  sshkey: () => {
    const questions = [
      {
        type: 'input',
        name: 'ssh_key_id',
        message: 'Enter sshkey id to delete:'
      }
    ];

    return inquirer.prompt(questions);
  }
};
