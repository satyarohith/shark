const BaseCommand = require('../../base');

class DomainsCommand extends BaseCommand {
  async run() {
    const {isTTY} = process.stdout;

    if (isTTY) {
      const {domainsInit} = require('../../prompts');
      const {command} = await domainsInit();

      switch (command) {
        case 'create': {
          const DomainsCreateCommand = require('./create');
          await DomainsCreateCommand.run();
          break;
        }

        case 'delete': {
          const DomainsDeleteCommand = require('./delete');
          await DomainsDeleteCommand.run();
          break;
        }

        case 'list': {
          const DomainsListCommand = require('./list');
          await DomainsListCommand.run();
          break;
        }

        default:
          process.exit(0);
      }
    } else {
      this._help();
    }
  }
}

DomainsCommand.description = `perform domain related operations`;

module.exports = DomainsCommand;
