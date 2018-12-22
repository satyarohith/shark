const BaseCommand = require('../../base');
const {flags} = require('@oclif/command');

class DomainsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DomainsListCommand);
    const {api, styledJSON} = this;
    const {body} = await api.domainsGetAll();
    if (flags.json) {
      this.log(styledJSON(body));
    } else {
      !body.meta.total
        ? this.log("You don't have any domains")
        : body.domains.map(domain => {
            this.log(`${domain.name}  ${domain.ttl}`);
          });
    }
  }
}

DomainsListCommand.description = `List all domains in your account`;

DomainsListCommand.flags = {
  json: flags.boolean({description: 'output in json format'})
};

module.exports = DomainsListCommand;
