const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class ActionsGetCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(ActionsGetCommand);
    const {isTTY} = process.stdout;
    const {api, styledJSON, spinner} = this;
    const {json} = flags;
    let {id} = flags;

    if (!id && isTTY) {
      const {askID} = require('../../prompts');
      const {actionID} = await askID('action');
      id = actionID;
    }

    try {
      spinner.start('Loading action...');
      const {body} = await api.accountGetAction(id);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        const {action} = body;
        this.log('ID:', action.id);
        this.log('Status:', action.status);
        this.log('Type:', action.type);
        this.log('Started At:', new Date(action.started_at).toUTCString());
        this.log('Completed At:', new Date(action.completed_at).toUTCString());
        this.log('Resource ID:', action.resource_id);
        this.log('Region:', action.region.name);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

ActionsGetCommand.description = 'get details about a specific action';

ActionsGetCommand.flags = {
  id: flags.integer({char: 'i', description: 'pass the action id'}),
  json: flags.boolean({description: 'output in json format'})
};

module.exports = ActionsGetCommand;
