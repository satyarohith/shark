const {flags} = require('@oclif/command');
const {cli} = require('cli-ux');
const BaseCommand = require('../../base');

class ActionsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(ActionsListCommand);
    const {json, page} = flags;
    const {api, styledJSON} = this;

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
      status: {},
      resource_type: {},
      resource_id: {},
      type: {},
      started_at: {},
      completed_at: {},
      region: {}
    };

    try {
      const {body} = await api.accountGetActions({page});

      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log("You haven't perfomed any actions");
      } else {
        const data = [];
        body.actions.map(action =>
          data.push({
            id: action.id,
            status: action.status,
            resource_type: action.resource_type,
            resource_id: action.resource_id,
            type: action.type,
            started_at: action.started_at,
            completed_at: action.completed_at,
            region: action.region_slug
          })
        );

        let totalPages = 1;
        let currentPage = 1;

        if (body.links.pages) {
          if (body.links.pages.next) {
            const nextPage = new URL(body.links.pages.next).searchParams.get(
              'page'
            );
            currentPage = Number(nextPage) - 1;
          } else if (body.links.pages.prev && !body.links.pages.next) {
            const prevPage = new URL(body.links.pages.prev).searchParams.get(
              'page'
            );
            currentPage = Number(prevPage) + 1;
          }

          if (body.links.pages.last) {
            const lastPage = new URL(body.links.pages.last).searchParams.get(
              'page'
            );
            totalPages = Number(lastPage);
          } else if (body.links.pages.prev && !body.links.pages.last) {
            const prevPage = new URL(body.links.pages.prev).searchParams.get(
              'page'
            );
            totalPages = Number(prevPage) + 1;
          }
        }

        cli.table(data, columns, options);
        this.log('Current Page:', currentPage);
        this.log('Total Pages:', totalPages);
      }
    } catch (error) {
      this.error(error);
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
