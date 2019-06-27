const { flags } = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsPasswordCommand extends BaseCommand {
  async run() {
    const { flags } = this.parse(DropletsPasswordCommand);
    const { api, spinner, styledJSON } = this;
    const { isTTY } = process.stdout;
    let { json, id } = flags;

    if (!id && isTTY) {
      const { askID } = require('../../prompts');
      const { dropletID } = await askID('droplet');
      id = dropletID;
    }

    try {
      const action = {
        type: `password_reset`
      };

      spinner.start(`Sending the request...`);
      const { body } = await api.dropletsRequestAction(id, action);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        this.log(`Password reset status: ${body.action.status}`);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsPasswordCommand.description = `password reset a droplet`;

DropletsPasswordCommand.flags = {
  json: flags.boolean({ char: 'j', description: 'output in json format' }),
  id: flags.integer({ char: 'i', description: 'droplet ID' })
};

module.exports = DropletsPasswordCommand;
