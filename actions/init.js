'use strict';
const { init } = require('../inquirer/init');
const Create = require('./create');
const Delete = require('./delete');
const List = require('./list');
console.log('Create', Create);
console.log('Delete', Delete);
console.log('List', List);

module.exports.Init = async () => {
  try {
    let anwsers = await init();
    switch (anwsers.init) {
      case 'delete':
        Delete.init();
        break;
      case 'create':
        Create.init();
        break;
      case 'list':
        List.init();
        break;
      default:
        process.exit();
        break;
    }
  } catch (error) {
    console.error(error);
  }
};
