const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');
const {askDomainName} = require('../../prompts');

class DomainsCreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DomainsCreateCommand);
    const {isTTY} = process.stdout;
    const {api, styledJSON} = this;

    let {name, ip, json} = flags;

    if (!name && isTTY) {
      const {domainName} = await askDomainName();
      name = domainName;
    }

    try {
      const {body} = await api.domainsCreate(name, ip);

      if (json) {
        this.log(styledJSON(body));
      } else {
        const {domain} = body;
        this.log(`Successfully created ${domain.name}`);
      }
    } catch (error) {
      this.error(error.message);
    }

    // Output the result
  }
}

DomainsCreateCommand.description = `Create a domain in DigitalOcean dns
Example:
$ shark domains:create --name=satyarohith.com --ip=1.1.1.1
`;

DomainsCreateCommand.flags = {
  json: flags.boolean({description: 'output in json format'}),
  name: flags.string({char: 'n', description: 'Domain name'}),
  ip: flags.string({char: 'i', description: 'IP address'})
};

DomainsCreateCommand.strict = false;

module.exports = DomainsCreateCommand;
