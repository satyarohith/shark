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

const askActionID = () => {
  return prompt({
    type: 'input',
    name: 'actionID',
    message: 'Enter the action ID:'
  });
};

const askKeyID = () => {
  return prompt({
    type: 'input',
    name: 'keyID',
    message: 'Enter the ssh_key ID:'
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

module.exports = {
  askToken,
  askActionID,
  askDomainName,
  askKeyID,
  domainsInit
};
