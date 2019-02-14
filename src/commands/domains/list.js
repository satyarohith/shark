const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DomainsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DomainsListCommand);
    const {api, styledJSON, spinner} = this;

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
      name: {},
      ttl: {
        header: 'TTL'
      },
      zone_file: {
        extended: true
      }
    };

    try {
      spinner.start('Loading your domains...');
      const {body} = await api.domainsGetAll();
      spinner.stop();
      if (flags.json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log("You don't have any domains");
      } else {
        const {cli} = require('cli-ux');
        const {calculatePages} = require('../../common');

        const data = [];

        body.domains.map(domain =>
          data.push({
            name: domain.name,
            ttl: domain.ttl,
            zone_file: domain.zone_file
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

DomainsListCommand.description = `List all domains in your account`;

DomainsListCommand.strict = false;

DomainsListCommand.flags = {
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

module.exports = DomainsListCommand;
