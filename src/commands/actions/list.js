const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class ActionsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(ActionsListCommand);
    const {json, page} = flags;
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
      id: {
        header: 'ID'
      },
      resource_id: {},
      resource_type: {},
      region: {},
      status: {},
      type: {},
      started_at: {},
      completed_at: {}
    };

    try {
      spinner.start('Loading actions...');
      const {body} = await api.accountGetActions({page});
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log("You haven't perfomed any actions");
      } else {
        const {cli} = require('cli-ux');
        const {calculatePages} = require('../../common');

        const data = [];

        body.actions.map(action =>
          data.push({
            id: action.id,
            status: action.status,
            resource_type: action.resource_type,
            resource_id: action.resource_id,
            type: action.type,
            started_at: new Date(action.started_at).toLocaleString(),
            completed_at: new Date(action.completed_at).toLocaleString(),
            region: action.region_slug
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

ActionsListCommand.description = 'List all executed actions';

ActionsListCommand.flags = {
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

module.exports = ActionsListCommand;
