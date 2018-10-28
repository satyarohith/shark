'use strict';
const { init } = require('../prompts/init');
const Create = require('./create');
const Delete = require('./delete');
const List = require('./list');
const Domain = require('./domain');

module.exports.init = async () => {
  try {
    const anwsers = await init();
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
      case 'domain':
        Domain.init();
        break;
      case 'exit':
        process.exit();
      default:
        console.error(`Unkown command: ${anwsers.init}`);
        process.exit();
    }
  } catch (error) {
    console.error(error);
  }
};
