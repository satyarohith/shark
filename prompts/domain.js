const inquirer = require('inquirer');
const { loadAvailableDomains } = require('../loaders');

module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'domain',
      message: 'What do you want to do?',
      choices: [
        { name: 'List all domains', value: 'list' },
        { name: 'Create a domain', value: 'create' },
        { name: 'Delete domains', value: 'delete' }
      ]
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.create = () => {
  const questions = [
    {
      type: 'input',
      name: 'domain_name',
      message: 'Enter your domain name:',
      filter: input => input.toLowerCase()
    }
  ];

  return inquirer.prompt(questions);
};

module.exports.delete = async () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'domains',
      message: 'Select the domain you want to delete:',
      choices: await loadAvailableDomains()
    }
  ];

  return inquirer.prompt(questions);
};
