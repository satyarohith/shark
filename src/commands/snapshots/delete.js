const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SnapshotsDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SnapshotsDeleteCommand);
    const {isTTY} = process.stdout;
    const {api, spinner} = this;
    let {id} = flags;

    if (!id && isTTY) {
      const {askID} = require('../../prompts');
      const {snapshotID} = await askID('snapshot');
      id = snapshotID;
    }

    try {
      spinner.start('Deleting snapshot...');
      const {response} = await api.snapshotsDeleteById(id);
      spinner.stop();
      if (response.statusCode === 204) {
        this.log('successfully deleted!');
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

SnapshotsDeleteCommand.description = `delete a snapshot
Examples:

delete a snapshot:
shark snapshots:delete --id 123456`;

SnapshotsDeleteCommand.flags = {
  id: flags.integer({
    char: 'i',
    description: 'pass the id of the droplet',
    multiple: true
  })
};

module.exports = SnapshotsDeleteCommand;
