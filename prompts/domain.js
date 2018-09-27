module.exports.init = () => {
  const questions = [
    {
      type: 'list',
      name: 'domain',
      message: 'What do you want to create?',
      choices: [
        { name: 'List all domains', value: 'list' },
        { name: 'Create a domain', value: 'create' },
        { name: 'Delete a domain', value: 'delete' }
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
