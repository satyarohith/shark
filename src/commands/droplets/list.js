const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class DropletsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsListCommand);
    const {api, styledJSON, spinner} = this;
    const {json, page} = flags;

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
      id: {},
      name: {},
      memory: {},
      vcpus: {
        header: 'VCPUS'
      },
      disk: {},
      public_ipv4: {
        header: 'Public IPv4'
      },
      private_ipv4: {
        header: 'Private IPv4'
      },
      public_ipv6: {
        header: 'Public IPv6'
      },
      region: {},
      status: {},
      ce: {
        header: 'CE',
        extended: true
      },
      hours: {
        extended: true
      }
    };

    try {
      spinner.start('Loading your droplets...');
      const {body} = await api.dropletsGetAll({page});
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log('You have zero droplets under your account');
      } else {
        const {cli} = require('cli-ux');
        const {calculatePages, calculateCostAndHours} = require('../../common');

        const data = [];

        body.droplets.map(droplet => {
          const {
            id,
            name,
            memory,
            vcpus,
            disk,
            status,
            region,
            networks,
            created_at,
            size
          } = droplet;

          const {totalCost, totalHours} = calculateCostAndHours(
            created_at,
            size.price_hourly
          );

          return data.push({
            id,
            name,
            memory,
            vcpus,
            disk,
            public_ipv4: networks.v4[0]
              ? networks.v4[0].ip_address
              : 'not available',
            private_ipv4: networks.v4[1]
              ? networks.v4[1].ip_address
              : 'not available',
            public_ipv6: networks.v6[0]
              ? networks.v6[0].ip_address
              : 'not available',
            status,
            region: region.slug,
            ce: totalCost.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            }),
            hours: totalHours
          });
        });

        const {currentPage, totalPages} = calculatePages(body.links);
        cli.table(data, columns, options);
        this.log('Current Page:', currentPage);
        this.log('Total Pages:', totalPages);
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsListCommand.description = 'List droplets under your account';

DropletsListCommand.flags = {
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

module.exports = DropletsListCommand;
