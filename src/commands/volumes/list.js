const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class ListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(ListCommand);
    const {styledJSON, spinner, api} = this;
    const {page, json} = flags;

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
      id: {
        header: 'ID'
      },
      droplet_ids: {
        extended: true
      },
      created_at: {},
      region: {},
      description: {
        extended: true
      },
      size_gigabytes: {
        header: 'Size (GiB)'
      },
      filesystem_type: {
        extended: true
      },
      filesystem_label: {
        extended: true
      },
      tags: {
        extended: true
      }
    };

    try {
      spinner.start('Loading volumes...');
      const {body} = await api.volumes({page});
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log('You have 0 volumes');
      } else {
        const {cli} = require('cli-ux');
        const {calculatePages} = require('../../common');

        const data = [];

        body.volumes.map(volume => {
          const regionName = volume.region.name;
          const createdAt = volume.created_at;
          delete volume.region;
          delete volume.created_at;

          return data.push({
            region: regionName,
            created_at: new Date(createdAt).toUTCString(),
            ...volume
          });
        });

        const {currentPage, totalPages} = calculatePages(body.links);

        cli.table(data, columns, options);
        if (totalPages > 1) {
          this.log('Current Page:', currentPage);
          this.log('Total Pages:', totalPages);
        }
      }
    } catch (error) {
      spinner.stop();
      this.error(error);
    }
  }
}

ListCommand.description = `list volumes`;

ListCommand.flags = {
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

module.exports = ListCommand;
