const {prompt} = require('enquirer');

// Check https://github.com/enquirer/enquirer/issues/13#issuecomment-447602031
prompt.on('cancel', () => process.exit());

/**
 * @param {string} name - The name of the project
 * @param {string} description - The description of the project
 * @param {string} purpose - The purpose of the project
 * @param {string} environment - The environment of the project's resources
 * @returns {Promise} prompt - Returns a prompt
 */
const askProjectDetails = (name, description, purpose, environment) => {
  return prompt({
    type: 'form',
    name: 'project',
    message: 'Enter the missing values:',
    choices: [
      {name: 'name', value: 'Name', initial: name},
      {
        name: 'description',
        value: 'Description',
        initial: description
      },
      {name: 'purpose', value: 'Purpose:', initial: purpose},
      {name: 'environment', value: 'Environment:', initial: environment}
    ]
  });
};

module.exports = {askProjectDetails};
