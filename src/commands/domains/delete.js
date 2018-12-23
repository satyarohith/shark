const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DomainsDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DomainsDeleteCommand);
    const {isTTY} = process.stdout;

    const {api} = this;
    let {name} = flags;

    if (!name && isTTY) {
      const {askDomainName} = require('../../prompts');
      const {domainName} = await askDomainName();
      name = domainName;
    }

    try {
      const {response} = await api.domainsDelete(name);
      if (response.statusCode === 204) {
        this.log(`Successfully deleted ${name}`);
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

DomainsDeleteCommand.description = 'Delete domains from DigitalOcean';

DomainsDeleteCommand.strict = false;

DomainsDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'domain name'})
};

module.exports = DomainsDeleteCommand;
