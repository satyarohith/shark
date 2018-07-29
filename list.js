module.exports = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'list',
        message: 'What do you want to list?',
        choices: [
          {
            name: 'Droplet',
            value: 'droplet'
          },
          {
            name: 'Domains',
            value: 'domain'
          },
          {
            name: 'Spaces',
            value: 'spaces'
          }
        ]
      }
    ];

    return inquirer.prompt(questions);
  }
};
