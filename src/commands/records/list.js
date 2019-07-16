const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class RecordsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(RecordsListCommand);
    const {api, spinner, styledJSON} = this;
    const {isTTY} = process.stdout;

    if (isTTY && !flags.name) {
      const {askName} = require('../../prompts');
      const {domainName} = await askName('domain', 'Enter domain name');
      flags.name = domainName;
    }

    const {name, json} = flags;

    const options = {
      columns: flags.columns,
      sort: flags.sort,
      filter: flags.filter,
      csv: flags.csv,
      extended: flags.extended,
      'no-truncate': flags['no-truncate'],
      'no-header': flags['no-header']
    };

    const columns = {
      id: {
        header: 'ID'
      },
      type: {},
      name: {},
      data: {},
      priority: {},
      port: {},
      ttl: {},
      weight: {},
      flags: {},
      tag: {}
    };

    try {
      spinner.start(`Loading ${name} records...`);
      const {body} = await api.domainRecordsGetAll(name);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log('No records found.');
      } else {
        const {cli} = require('cli-ux');
        const {calculatePages} = require('../../common');

        const data = [];

        body.domain_records.map(record =>
          data.push({
            id: record.id,
            type: record.type,
            name: record.name,
            data: record.data,
            priority: record.priority,
            port: record.port,
            ttl: record.ttl,
            weight: record.weight,
            flags: record.flags,
            tag: record.tag
          })
        );

        const {currentPage, totalPages} = calculatePages(body.links);

        cli.table(data, columns, options);
        if (totalPages > 1) {
          this.log('Current Page:', currentPage);
          this.log('Total Pages:', totalPages);
        }
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

RecordsListCommand.description = 'list domain records';

RecordsListCommand.flags = {
  name: flags.string({char: 'n', description: 'domain name'}),
  columns: flags.string({
    exclusive: ['additional'],
    description: 'only show provided columns (comma-seperated)'
  }),
  sort: flags.string({
    description: 'property to sort by (prepend ' - ' for descending)'
  }),
  filter: flags.string({
    description: 'filter property by partial string matching, ex: name=foo'
  }),
  csv: flags.boolean({
    exclusive: ['no-truncate'],
    description: 'output is csv format'
  }),
  extended: flags.boolean({char: 'x', description: 'show extra columns'}),
  'no-truncate': flags.boolean({
    exclusive: ['csv'],
    description: 'do not truncate output to fit screen'
  }),
  'no-header': flags.boolean({
    exclusive: ['csv'],
    description: 'hide table header from output'
  }),
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  page: flags.integer({
    char: 'p',
    description: 'specific page to request'
  })
};

module.exports = RecordsListCommand;
