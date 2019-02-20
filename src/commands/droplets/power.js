const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsPowerCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsPowerCommand);
    const {api, spinner, styledJSON} = this;
    const {json, id, on, off} = flags;

    const userChoice = on ? 'on' : off ? 'off' : null;

    try {
      const action = {
        type: `power_${userChoice}`
      };

      spinner.start(`Requesting to power ${userChoice} droplet...`);
      const {body} = await api.dropletsRequestAction(id, action);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        this.log(`Your droplet will be powered ${userChoice} shortly.`);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsPowerCommand.description = `power on/off a droplet`;

DropletsPowerCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.integer({char: 'i', description: 'droplet ID', required: true}),
  on: flags.boolean({char: 'o', description: 'power on droplet'}),
  off: flags.boolean({char: 'f', description: 'power off droplet'})
};

module.exports = DropletsPowerCommand;
