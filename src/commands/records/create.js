const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class RecordsCreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(RecordsCreateCommand);
    const {isTTY} = process.stdout;
    const {api, spinner, styledJSON} = this;

    if (isTTY) {
      if (!flags['domain-name']) {
        const {askDomainName} = require('../../prompts');
        const {domainName} = await askDomainName();
        flags['domain-name'] = domainName;
      }

      if (!flags.type) {
        const {askRecordType} = require('../../prompts/records');
        const {recordType} = await askRecordType();
        flags.type = recordType;
      }

      if (!flags.data) {
        const {askRecordData} = require('../../prompts/records');
        const {recordData} = await askRecordData();
        flags.data = recordData;
      }
    }

    const config = {
      type: flags.type,
      name: flags.name,
      data: flags.data,
      priority: flags.priority,
      port: flags.port,
      ttl: flags.ttl,
      weight: flags.weight,
      flags: flags.flags,
      tag: flags.tag
    };

    try {
      spinner.start(`Crearting record...`);
      const {body} = await api.domainRecordsCreate(
        flags['domain-name'],
        config
      );
      spinner.stop();
      if (flags.json) {
        this.log(styledJSON(body));
      } else {
        this.log('Domain record created.');
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

RecordsCreateCommand.description = `create a domain record`;

RecordsCreateCommand.flags = {
  'domain-name': flags.string({char: 'D', description: 'The domain name'}),
  name: flags.string({
    char: 'n',
    description: 'The host name, alias, or service being defined by the record.'
  }),
  type: flags.string({
    char: 't',
    description: 'The type of the record (A, MX, CNAME, etc).'
  }),
  data: flags.string({
    char: 'd',
    description:
      "The data for the record. For example, the 'data' for an 'A' record would be the IPv4 Address."
  }),
  priority: flags.string({
    char: 'P',
    description: 'The priority of the host (for SRV and MX records).'
  }),
  port: flags.string({
    char: 'p',
    description:
      'The port that the service is accessible on (for SRV records only).'
  }),
  ttl: flags.integer({
    char: 'T',
    description: 'This value is the time to live for the record, in seconds.'
  }),
  tag: flags.string({
    description:
      'The parameter tag for CAA records. Valid values are "issue", "issuewild", or "iodef"'
  }),
  json: flags.boolean({char: 'j', description: 'output in json format'})
};

module.exports = RecordsCreateCommand;
