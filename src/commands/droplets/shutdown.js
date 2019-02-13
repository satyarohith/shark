const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsShutdownCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsShutdownCommand);
    const {api, spinner, styledJSON} = this;
    const {json, id} = flags;

    try {
      const action = {
        type: 'shutdown'
      };

      spinner.start(`Requesting to shutdown droplet...`);
      const {body} = await api.dropletsRequestAction(id, action);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        this.log('Request complete. Your droplet will shutdown soon.');
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsShutdownCommand.description = `shutdown a droplet`;

DropletsShutdownCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.integer({char: 'i', description: 'droplet ID', required: true})
};

module.exports = DropletsShutdownCommand;
