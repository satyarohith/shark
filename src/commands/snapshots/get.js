const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SnapshotsGetCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SnapshotsGetCommand);
    const {isTTY} = process.stdout;
    const {api, styledJSON, spinner} = this;
    const {json} = flags;
    let {id} = flags;

    if (!id && isTTY) {
      const {askID} = require('../../prompts');
      const {snapshotID} = await askID('snapshot');
      id = snapshotID;
    }

    try {
      spinner.start('Loading action...');
      const {body} = await api.snapshotsGetById(id);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        const {snapshot} = body;
        this.log('ID:', snapshot.id);
        this.log('Name:', snapshot.name);
        this.log('Size Gigabytes:', snapshot.size_gigabytes);
        this.log('Min disk size:', snapshot.min_disk_size);
        this.log('Created At:', new Date(snapshot.completed_at).toUTCString());
        this.log('Resource Type:', snapshot.resource_type);
        this.log('Resource ID:', snapshot.resource_id);
        this.log('Regions:', snapshot.regions);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

SnapshotsGetCommand.description = `get details of a snapshot`;

SnapshotsGetCommand.flags = {
  id: flags.integer({char: 'i', description: 'pass the action id'}),
  json: flags.boolean({description: 'output in json format'})
};

module.exports = SnapshotsGetCommand;
