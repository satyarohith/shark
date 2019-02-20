const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsSnapshotCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsSnapshotCommand);
    const {api, spinner, styledJSON} = this;
    const {isTTY} = process.stdout;

    if (isTTY) {
      if (!flags.id) {
        const {askID} = require('../../prompts');
        const {dropletID} = await askID('droplet');
        flags.id = dropletID;
      }
      if (!flags.name) {
        const {askName} = require('../../prompts');
        const {snapshotName} = await askName(
          'snapshot',
          'Give name to the new snapshot'
        );
        flags.name = snapshotName;
      }
    }

    try {
      const action = {
        type: 'snapshot',
        name: flags.name
      };

      spinner.start(`Requesting to snapshot the droplet...`);
      const {body} = await api.dropletsRequestAction(flags.id, action);
      spinner.stop();
      if (flags.json) {
        this.log(styledJSON(body));
      } else {
        this.log(`Request complete. Status: ${body.action.status}`);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsSnapshotCommand.description = `snapshot a droplet`;

DropletsSnapshotCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.integer({char: 'i', description: 'droplet ID'}),
  name: flags.string({char: 'n', description: 'give name to the new snapshot'})
};

module.exports = DropletsSnapshotCommand;
