const { init } = require('../inquirer/init');
const Create = require('./create');
const Delete = require('./delete');
const List = require('./list');

module.exports = {
  Init: async () => {
    let anwsers = await init();
    switch (anwsers.init) {
      case 'create':
        Create.init();
        break;
      case 'delete':
        Delete.init();
        break;
      case 'list':
        List.init();
      default:
        break;
    }
  }
};
