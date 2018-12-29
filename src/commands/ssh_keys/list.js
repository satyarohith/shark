const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SSHKeysListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SSHKeysListCommand);
    const {api, styledJSON} = this;

    const {json, page, tag} = flags;

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
      fingerprint: {},
      public_key: {
        extended: true
      }
    };

    try {
      const {body} = await api.accountGetKeys({page, tag_name: tag});
      if (json) {
        this.log(styledJSON(body));
      } else if (body.meta.total === 0) {
        this.log("You don't have any SSH keys under this account");
      } else {
        const {cli} = require('cli-ux');

        cli.table(body.ssh_keys, columns, options);
      }
    } catch (error) {
      this.error(error);
    }
  }
}

SSHKeysListCommand.description = `list all SSH Keys under your account`;

SSHKeysListCommand.flags = {
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
  }),
  tag: flags.string({
    char: 't',
    description: 'pass tag name to retrieve keys associated with the tag'
  })
};

module.exports = SSHKeysListCommand;
