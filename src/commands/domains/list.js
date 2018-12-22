const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DomainsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DomainsListCommand);
    const {api, styledJSON} = this;
    const {body} = await api.domainsGetAll();
    if (flags.json) {
      this.log(styledJSON(body));
    } else if (body.meta.total === 0) {
      this.log("You don't have any domains");
    } else {
      body.domains.map(domain => {
        return this.log(`${domain.name}  ${domain.ttl}`);
      });
    }
  }
}

DomainsListCommand.description = `List all domains in your account`;

DomainsListCommand.flags = {
  json: flags.boolean({description: 'output in json format'})
};

module.exports = DomainsListCommand;
