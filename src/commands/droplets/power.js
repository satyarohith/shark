const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsPowerCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsPowerCommand);
    const {api, spinner, styledJSON} = this;
    const {json, id, cycle, on, off} = flags;

    let userChoice;
    if (cycle) {
      userChoice = 'cycle';
    } else if (on) {
      userChoice = 'on';
    } else if (off) {
      userChoice = 'off';
    }

    try {
      const action = {
        type: `power_${userChoice}`
      };

      spinner.start(`Requesting to power ${userChoice} droplet...`);
      const {body} = await api.dropletsRequestAction(id, action);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else if (cycle === true) {
        this.log(`Your droplet will go through a power cycle.`);
      } else {
        this.log(`Your droplet will be powered ${userChoice} shortly.`);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsPowerCommand.description = `power on/off/cycle a droplet`;

DropletsPowerCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.integer({char: 'i', description: 'droplet ID', required: true}),
  on: flags.boolean({char: 'o', description: 'power on droplet'}),
  off: flags.boolean({char: 'f', description: 'power off droplet'}),
  cycle: flags.boolean({
    char: 'c',
    description: 'power cycle (off and on) a droplet'
  })
};

module.exports = DropletsPowerCommand;
