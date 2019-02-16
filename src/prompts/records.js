const {prompt} = require('enquirer');

// Check https://github.com/enquirer/enquirer/issues/13#issuecomment-447602031
prompt.on('cancel', () => process.exit());

const askRecordID = records => {
  return prompt({
    type: 'select',
    name: 'recordID',
    choices: records
  });
};

module.exports = {
  askRecordID
};
