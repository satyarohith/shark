const {prompt} = require('enquirer');

// Check https://github.com/enquirer/enquirer/issues/13#issuecomment-447602031
prompt.on('cancel', () => process.exit());

const askToken = () => {
  return prompt({
    type: 'input',
    name: 'token',
    message: 'What is your token?'
  });
};

const askDomainName = () => {
  return prompt({
    type: 'input',
    name: 'domainName',
    message: 'Enter your domain name:'
  });
};

const domainsInit = () => {
  return prompt({
    type: 'select',
    name: 'command',
    message: 'What to do?',
    initial: 2,
    choices: [
      {name: 'create', message: 'Create domains'},
      {name: 'delete', message: 'Delete domains'},
      {name: 'list', message: 'List domains'},
      {name: 'exit', message: 'Exit'}
    ]
  });
};

/**
 * @param {string} resourceName - Name of the resource ex: domain, droplet etc
 * @returns {Promise} - The name of the prompt is resourceName + 'ID' ex: askID('droplet')
 * -> name will be 'dropletID'
 */
const askID = resourceName => {
  return prompt({
    type: 'input',
    name: `${resourceName}ID`,
    message: `Enter ${resourceName} ID:`
  });
};

module.exports = {
  askID,
  askToken,
  askDomainName,
  domainsInit
};
