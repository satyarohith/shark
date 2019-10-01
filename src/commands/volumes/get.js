const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class VolumesGetCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(VolumesGetCommand);
    const {spinner, api, styledJSON} = this;
    const {isTTY} = process.stdout;
    const noPrompts = flags['no-prompts'];
    const promptsAllowed = !noPrompts && isTTY;

    if (!flags.id && promptsAllowed) {
      const {askID} = require('../../prompts');
      const {volumeID} = await askID('volume');
      flags.id = volumeID;
    }

    const {id, json} = flags;

    try {
      spinner.start('Loading volume...');
      const {body} = await api.volumesGetById(id);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        const {volume} = body;
        this.log('Name:', volume.name);
        this.log('Desc:', volume.description);
        this.log('Droplets:', volume.droplet_ids);
        this.log('Region:', volume.region.name);
        this.log('Size:', volume.size_gigabytes + 'GiB');
        this.log('FS Type:', volume.filesystem_type);
      }

      spinner.stop();
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

VolumesGetCommand.description = `get details of specific volume`;

VolumesGetCommand.flags = {
  id: flags.string({char: 'i', description: 'id of the volume'}),
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  'no-prompts': flags.boolean({
    char: 'P',
    description: 'disable interactive prompts'
  })
};

module.exports = VolumesGetCommand;
