const {flags} = require('@oclif/command');
const chalk = require('chalk');
const BaseCommand = require('../../base');

class DomainsDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DomainsDeleteCommand);
    const {isTTY} = process.stdout;

    const {api, spinner} = this;
    let {name} = flags;

    if (!name && isTTY) {
      const {askDomainName} = require('../../prompts');
      const {domainName} = await askDomainName();
      name = domainName;
    }

    try {
      spinner.start(`Deleting ${name}...`);
      const {response} = await api.domainsDelete(name);
      spinner.stop();
      if (response.statusCode === 204) {
        this.log(chalk.green(`Successfully deleted ${name}`));
      }
    } catch (error) {
      spinner.stop();
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
