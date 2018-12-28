const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class ProjectsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(ProjectsListCommand);
    const {api, styledJSON} = this;
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
      id: {
        extended: true
      },
      owner_id: {
        extended: true
      },
      owner_uuid: {
        extended: true
      },
      name: {},
      description: {},
      purpose: {},
      environment: {
        extended: true
      },
      is_default: {},
      created_at: {
        extended: true
      },
      updated_at: {
        extended: true
      }
    };

    try {
      const {body} = await api.projects({page});
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log("You don't have any projects under your account");
      } else {
        const {cli} = require('cli-ux');
        const projects = [];

        body.projects.map(project => {
          return projects.push({
            id: project.id,
            owner_uuid: project.owner_uuid,
            owner_id: project.owner_id,
            name: project.name,
            description: project.description,
            purpose: project.purpose,
            environment: project.environment,
            is_default: project.is_default,
            created_at: new Date(project.created_at).toUTCString(),
            updated_at: new Date(project.updated_at).toUTCString()
          });
        });
        cli.table(projects, columns, options);
      }
    } catch (error) {
      this.error(error);
    }
  }
}

ProjectsListCommand.description = 'list projects under your account';

ProjectsListCommand.flags = {
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

module.exports = ProjectsListCommand;
