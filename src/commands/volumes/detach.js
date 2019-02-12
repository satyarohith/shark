const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class VolumesDetachCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(VolumesDetachCommand);
    const {id: volumeID, region, 'droplet-id': dropletID, json} = flags;
    const {spinner, api, styledJSON} = this;

    try {
      const action = {
        type: 'detach',
        droplet_id: dropletID,
        region
      };
      spinner.start('Detaching volume...');
      const {body} = await api.volumesRequestAction(volumeID, action);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        this.log('The request has been initiated. Status:', body.action.status);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

VolumesDetachCommand.description = `detach a volume from a droplet (action)`;

VolumesDetachCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.string({char: 'i', description: 'volume ID'}),
  'droplet-id': flags.integer({char: 'd', description: 'droplet ID'}),
  region: flags.string({char: 'r', description: 'region of the volume'})
};

module.exports = VolumesDetachCommand;
