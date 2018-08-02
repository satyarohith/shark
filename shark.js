const argv = require('yargs').argv;
const Create = require('./actions/create');
const Delete = require('./actions/delete');
const List = require('./actions/list');
const { Init } = require('./actions/init');
const { callMatchingMethod } = require('./util');

module.exports = () => {
  switch (argv._[0]) {
    case 'create':
      callMatchingMethod(Create, argv._[1]);
      break;
    case 'delete':
      callMatchingMethod(Delete, argv._[1]);
      break;
    case 'list':
      callMatchingMethod(List, argv._[1]);
      break;
    default:
      Init();
      break;
  }
};
