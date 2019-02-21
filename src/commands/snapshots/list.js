const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SnapshotsListCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SnapshotsListCommand);
    const {api, styledJSON, spinner} = this;
    const {json} = flags;

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
      const {body} = await api.snapshots();
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
            created_at: new Date(snapshot.created_at).toLocaleString()
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
  json: flags.boolean({char: 'j', description: 'output in json format'})
};

module.exports = SnapshotsListCommand;
