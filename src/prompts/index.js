const {prompt} = require('enquirer');

const askToken = () => {
  return prompt({
    type: 'input',
    name: 'token',
    message: 'What is your token?'
  });
};

module.exports = {
  askToken
};
