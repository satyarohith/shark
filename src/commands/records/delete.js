const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class RecordsDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(RecordsDeleteCommand);
    const {isTTY} = process.stdout;
    let {name, id} = flags;
    const {api, spinner} = this;

    if (!name && isTTY) {
      const {askDomainName} = require('../../prompts');
      const {domainName} = await askDomainName();
      name = domainName;
    }

    if (!id && isTTY) {
      //  Load all available records of the domain and prompt
      try {
        spinner.start(`Loading ${name} records...`);
        const {body} = await api.domainRecordsGetAll(name);
        spinner.stop();

        const records = [];
        body.domain_records.map(record =>
          records.push({
            message: `${record.type} ${record.name} ${record.data}`,
            value: record.id
          })
        );

        const {askRecordID} = require('../../prompts/records');
        const {recordID} = await askRecordID(records);
        id = recordID;
      } catch (error) {
        spinner.stop();
        this.error(error.message);
      }
    }

    try {
      spinner.start(`Deleting records...`);
      const {response} = await api.domainRecordsDelete(name, id);
      spinner.stop();
      if (response.statusCode === 204) {
        this.log(`Domain record deleted!`);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

RecordsDeleteCommand.description = `delete a domain record`;

RecordsDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'domain name'}),
  id: flags.string({char: 'i', description: 'domain record ID'})
};

module.exports = RecordsDeleteCommand;
