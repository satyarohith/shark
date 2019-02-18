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

const askRecordType = () => {
  return prompt({
    type: 'select',
    message: 'Select record type',
    name: 'recordType',
    choices: ['A', 'AAAA', 'CNAME', 'TXT', 'NS', 'MX', 'SRV']
  });
};

const askRecordData = () => {
  return prompt({
    type: 'input',
    message: 'Enter record data',
    name: 'recordData'
  });
};

module.exports = {
  askRecordData,
  askRecordID,
  askRecordType
};
