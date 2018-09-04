'use strict';
const { init } = require('../inquirer/init');
const Create = require('./create');
const Delete = require('./delete');
const List = require('./list');

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
    }
  } catch (error) {
    console.error(error);
  }
};
