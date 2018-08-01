const inquirer = require('inquirer');

module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'init',
      message: 'What do you want to do?',
      choices: [
        {
          name: 'Create',
          value: 'create'
        },
        {
          name: 'Delete',
          value: 'delete'
        },
        {
          name: 'List',
          value: 'list'
        }
      ]
    }
  ];

  return inquirer.prompt(questions);
};
