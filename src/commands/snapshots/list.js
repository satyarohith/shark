const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SnapshotsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SnapshotsListCommand);
    const {api, styledJSON, spinner} = this;
    const {json, droplets, volumes} = flags;

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
      name: {},
      created_at: {},
      resource_type: {},
      resource_id: {},
      regions: {},
      min_disk_size: {},
      size_gigabytes: {}
    };

    try {
      spinner.start('Loading snapshots....');
      let data;
      if (droplets) {
        data = await api.snapshotsDroplets();
      } else if (volumes) {
        data = await api.snapshotsVolumes();
      } else {
        data = await api.snapshots();
      }

      const {body} = data;
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log("You didn't take any snapshots");
      } else {
        const {cli} = require('cli-ux');
        const {calculatePages} = require('../../common');

        const data = [];

        body.snapshots.map(snapshot =>
          data.push({
            ...snapshot,
            created_at: new Date(snapshot.created_at).toUTCString()
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

SnapshotsListCommand.description = `list all snapshots`;

SnapshotsListCommand.flags = {
  droplets: flags.boolean({
    char: 'd',
    description: 'list all droplet snapshots'
  }),
  volumes: flags.boolean({
    char: 'v',
    description: 'list all volumes snapshots'
  }),
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

module.exports = SnapshotsListCommand;
