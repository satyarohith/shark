'use strict';
const inquirer = require('inquirer');

module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'list',
      message: 'What do you want to list?',
      choices: [
        { name: 'Droplets', value: 'droplets' },
        { name: 'Snapshots', value: 'snapshots' },
        { name: 'SSH Keys', value: 'ssh_keys' },
        { name: 'Floating Ips', value: 'floating_ips' },
        { name: 'Volumes', value: 'volumes' },
        { name: 'Load Balancers', value: 'loadbalancers' },
        { name: '<- Back', value: 'back' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ];

  return inquirer.prompt(questions);
};
