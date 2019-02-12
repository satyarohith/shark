const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsBackupsCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsBackupsCommand);
    const {api, spinner, styledJSON} = this;
    const {json, id, enable, disable} = flags;

    const userChoice = enable ? 'enable' : disable ? 'disable' : null;

    try {
      const action = {
        type: `${userChoice}_backups`
      };

      spinner.start(`Requesting to ${userChoice} backups...`);
      const {body} = await api.dropletsRequestAction(id, action);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        this.log('Request complete. Status:', body.action.status);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsBackupsCommand.description = `enable/disable backups for a droplet`;

DropletsBackupsCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.integer({char: 'i', description: 'droplet ID', required: true}),
  enable: flags.boolean({char: 'e', description: 'enable backups'}),
  disable: flags.boolean({char: 'd', description: 'disable backups'})
};

module.exports = DropletsBackupsCommand;
