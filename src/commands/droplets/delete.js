const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsDeleteCommand);
    const {isTTY} = process.stdout;
    const {api} = this;
    let {id} = flags;

    if (!id && isTTY) {
      const {askID} = require('../../prompts');
      const {dropletID} = await askID('droplet');
      id = dropletID;
    }

    try {
      const {response} = await api.dropletsDelete(id);
      if (response.statusCode === 204) {
        this.log('successfully deleted!');
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

DropletsDeleteCommand.description = 'delete a droplet';

DropletsDeleteCommand.flags = {
  id: flags.integer({
    char: 'n',
    description: 'pass the id of the droplet'
  })
};

module.exports = DropletsDeleteCommand;
