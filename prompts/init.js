'use strict';
const inquirer = require('inquirer');

module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'init',
      message: 'What do you want to do?',
      choices: [
        { name: 'Create', value: 'create' },
        { name: 'Delete', value: 'delete' },
        { name: 'Domain', value: 'domain' },
        { name: 'List', value: 'list' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ];

  return inquirer.prompt(questions);
};
