'use strict';
const inquirer = require('inquirer');

module.exports = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'list',
        message: 'What do you want to list?',
        choices: [
          {
            name: 'Droplets',
            value: 'droplets'
          },
          {
            name: 'Domains',
            value: 'domains'
          },
          {
            name: 'SSh Keys',
            value: 'ssh_keys'
          }
        ]
      }
    ];

    return inquirer.prompt(questions);
  }
};
