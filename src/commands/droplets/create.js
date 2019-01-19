const {flags} = require('@oclif/command');
/* eslint-disable capitalized-comments */
const BaseCommand = require('../../base');

class DropletsCreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DropletsCreateCommand);
    const {api} = this;

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
      const {body} = await api.dropletsCreate(config);
      if (flags.json) {
        this.log(this.styledJSON(body));
      } else {
        this.log(body.droplet.name, 'created at', body.droplet.region.name);
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

DropletsCreateCommand.description = 'create a droplet';

DropletsCreateCommand.flags = {
  name: flags.string({
    char: 'n',
    description: 'name of the droplet',
    required: true
  }),
  region: flags.string({
    char: 'r',
    description: 'region of the droplet',
    required: true
  }),
  size: flags.string({
    char: 's',
    description: 'size of the droplet',
    required: true
  }),
  image: flags.string({
    char: 'i',
    description: 'operating system to use',
    required: true
  }),
  ssh_keys: flags.string({
    char: 'k',
    description: 'ssh_key to use',
    multiple: true
  }),
  user_data: flags.string({char: 'd', description: 'user data to upload'}),
  tags: flags.string({multiple: true}),
  volumes: flags.string({multiple: true}),
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  backups: flags.boolean({char: 'b'}),
  ipv6: flags.boolean({char: 'I', description: 'IPv6 public address'}),
  private_networking: flags.boolean({
    char: 'P',
    description: 'private networking'
  }),
  monitoring: flags.boolean({
    char: 'm',
    description: 'enable droplet monitoring'
  })
};

module.exports = DropletsCreateCommand;
