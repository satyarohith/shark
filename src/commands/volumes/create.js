const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class VolumesCreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(VolumesCreateCommand);
    const {api, spinner, styledJSON} = this;
    const {json} = flags;
    const {isTTY} = process.stdout;
    const noPrompts = flags['no-prompts'];
    const promptsAllowed = !noPrompts && isTTY;

    if (promptsAllowed) {
      if (!flags.name) {
        const {askName} = require('../../prompts');
        const {volumeName} = await askName('volume', 'Enter volume name');
        flags.name = volumeName;
      }

      if (!flags.region) {
        const {askRegion} = require('../../prompts');
        const {loadRegions} = require('../../common/loaders');
        let regions = await loadRegions(api, spinner);
        // Filter unavailable regions
        regions = regions.filter(region => region.available);
        // Take what we want
        regions = regions.map(region => ({
          message: region.name,
          value: region.slug
        }));
        const {volumeRegion} = await askRegion('volume', regions);
        flags.region = volumeRegion;
      }

      if (!flags.size_gigabytes) {
        const {askVolumeSize} = require('../../prompts');
        const {size} = await askVolumeSize();
        flags.size = size;
      }
    }

    const volume = {
      size_gigabytes: flags.size,
      name: flags.name,
      region: flags.region,
      description: flags.desc,
      filesystem_type: flags['fs-type'],
      filesystem_label: flags['fs-label'],
      snapshot_id: flags['snap-id'],
      tags: flags.tags
    };

    try {
      spinner.start('creating volume...');
      const {body} = await api.volumesCreate(volume);
      spinner.stop();
      if (json) {
        this.log(styledJSON(body));
      } else {
        const {volume} = body;
        this.log(volume.name, 'created!');
      }
    } catch (error) {
      spinner.stop();
      this.log(error);
      this.error(error.message);
    }
  }
}

VolumesCreateCommand.description = `create a volume`;

VolumesCreateCommand.flags = {
  name: flags.string({
    char: 'n',
    description: '(required) name for the volume'
  }),
  region: flags.string({
    char: 'r',
    description: '(required) region for the volume ex: blr1'
  }),
  size: flags.integer({
    char: 's',
    description: '(required) size of the volume in GiB'
  }),
  desc: flags.string({char: 'd', description: 'optional discription'}),
  'snap-id': flags.string({
    char: 'S',
    description: 'provide snapshot_id to create a volume using the snapshot'
  }),
  'fs-type': flags.string({
    char: 'f',
    description:
      'provide filesystem_type to format the volume ("ext4" or "xfs")'
  }),
  'fs-label': flags.string({
    char: 'l',
    description: 'The label to be applied to the filesystem'
  }),
  tags: flags.string({
    char: 't',
    multiple: true,
    description: 'tags to apply to the volume (new or existing)'
  }),
  json: flags.boolean({
    char: 'j',
    description: 'output in json format'
  }),
  'no-prompts': flags.boolean({
    char: 'P',
    description: 'disable interactive prompts'
  })
};

module.exports = VolumesCreateCommand;
