const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class VolumesDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(VolumesDeleteCommand);
    const {spinner, api} = this;
    const {isTTY} = process.stdout;
    const noPrompts = flags['no-prompts'];
    const promptsAllowed = !noPrompts && isTTY;

    if (!flags.id && promptsAllowed) {
      const {askID} = require('../../prompts');
      const {volumeID} = await askID('volume');
      flags.id = volumeID;
    }

    const {id} = flags;

    try {
      spinner.start('Deleting volume...');
      const {response} = await api.volumesDeleteById(id);
      spinner.stop();
      if (response.statusCode === 204) {
        this.log('successfully deleted!');
      }

      spinner.stop();
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

VolumesDeleteCommand.description = `delete a volume`;

VolumesDeleteCommand.flags = {
  id: flags.string({char: 'i', description: 'id of the volume'}),
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  'no-prompts': flags.boolean({
    char: 'P',
    description: 'disable interactive prompts'
  })
};

module.exports = VolumesDeleteCommand;
