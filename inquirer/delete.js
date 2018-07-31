const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = {
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
  }
};
