const { flags } = require('@oclif/command')
const BaseCommand = require('../../base');

class CDNCreateCommand extends BaseCommand {
  async run() {
    const { flags } = this.parse(CDNCreateCommand)
    const { api, spinner, styledJSON } = this;
    const { origin, ttl } = this;

    try {
      spinner.start('Creating new CDN endpoint..');
      const { body } = await api.cndEndpointCreate();
      spinner.stop();
    } catch (error) {
      spinner.stop();
    }
  }
}

CDNCreateCommand.description = `create a new CDN endpoint`

CDNCreateCommand.flags = {
  origin: flags.string({ char: 'o', description: 'FQDN for the origin server which provides the content for the CDN.' }),
}

module.exports = CDNCreateCommand
