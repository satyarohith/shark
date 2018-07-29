const inquirer = require('inquirer');

module.exports = {
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
