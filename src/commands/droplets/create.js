const {flags} = require('@oclif/command');
const {green} = require('chalk');
const BaseCommand = require('../../base');

class DropletsCreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsCreateCommand);
    const {api, spinner} = this;
    const {isTTY} = process.stdout;
    const noPrompts = flags['no-prompts'];
    const promptsAllowed = !noPrompts && isTTY;

    if (promptsAllowed) {
      if (!flags.name) {
        const {askName} = require('../../prompts');
        const {dropletName} = await askName('droplet', 'Name your droplet');
        flags.name = dropletName;
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
        const {dropletRegion} = await askRegion('droplet', regions);
        flags.region = dropletRegion;
      }

      if (!flags.size) {
        const {askDropletSize} = require('../../prompts/droplets');
        const {loadDropletSizes} = require('../../common/loaders');
        let sizes = await loadDropletSizes(api, spinner);
        // The next line is for enquirer
        sizes = sizes.map(size => ({message: size.name, value: size.value}));
        const {dropletSize} = await askDropletSize(sizes);
        flags.size = dropletSize;
      }

      if (!flags.image) {
        const {askDropletImage} = require('../../prompts/droplets');
        const {loadDropletImages} = require('../../common/loaders');
        const images = await loadDropletImages(api, spinner);
        const {dropletImage} = await askDropletImage(images);
        flags.image = dropletImage;
      }

      if (!flags.ssh_keys) {
        const {loadSSHKeys} = require('../../common/loaders');
        const keys = await loadSSHKeys(api, spinner);
        const {askSSHKey} = require('../../prompts/droplets');
        const {sshKey} = await askSSHKey(keys);
        flags.ssh_keys = sshKey;
      }

      if (!flags.backups || !flags.ipv6 || !flags.monitoring) {
        const {askAdditionalOptions} = require('../../prompts/droplets');
        const {additionalOptions} = await askAdditionalOptions();
        flags.backups = additionalOptions.includes('backups');
        flags.ipv6 = additionalOptions.includes('ipv6');
        flags.monitoring = additionalOptions.includes('monitoring');
      }
    }

    const config = {
      name: flags.name,
      region: flags.region,
      size: flags.size,
      image: flags.image,
      ssh_keys: flags.ssh_keys,
      backups: flags.backups,
      ipv6: flags.ipv6,
      private_networking: flags.private_networking,
      user_data: flags.user_data,
      monitoring: flags.monitoring,
      volumes: flags.volumes,
      tags: flags.tags
    };

    try {
      spinner.start(`Creating ${flags.name}...`);
      const {body} = await api.dropletsCreate(config);
      spinner.stop();
      if (flags.json) {
        this.log(this.styledJSON(body));
      } else {
        this.log(
          `${green(`✔ ${body.droplet.name}`)} created at ${
            body.droplet.region.name
          }`
        );
      }
    } catch (error) {
      spinner.stop();
      this.error(error.message);
    }
  }
}

DropletsCreateCommand.description = 'create a droplet';

DropletsCreateCommand.flags = {
  name: flags.string({
    char: 'n',
    description: '(required) name of the droplet'
  }),
  region: flags.string({
    char: 'r',
    description: '(required) region of the droplet'
  }),
  size: flags.string({
    char: 's',
    description: '(required) size of the droplet'
  }),
  image: flags.string({
    char: 'i',
    description: '(required) operating system to use'
  }),
  ssh_keys: flags.string({
    char: 'k',
    description: 'sshkey IDs to attach to the droplet',
    multiple: true
  }),
  user_data: flags.string({char: 'd', description: 'user data to upload'}),
  tags: flags.string({multiple: true, description: 'tags'}),
  volumes: flags.string({multiple: true, description: 'volume IDs'}),
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  backups: flags.boolean({char: 'b', description: 'enable automated backups'}),
  ipv6: flags.boolean({char: 'I', description: 'IPv6 public address'}),
  private_networking: flags.boolean({
    char: 'p',
    description: 'enable private networking'
  }),
  monitoring: flags.boolean({
    char: 'm',
    description: 'enable droplet monitoring'
  }),
  'no-prompts': flags.boolean({
    char: 'P',
    description: 'disable interactive prompts'
  })
};

module.exports = DropletsCreateCommand;
