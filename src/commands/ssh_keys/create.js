const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SSHKeysCreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SSHKeysCreateCommand);
    const {api, styledJSON} = this;
    let {name, key} = flags;
    const {isTTY} = process.stdout;

    if (!name && isTTY) {
      const {askName} = require('../../prompts');
      const {sshKeyName} = await askName(
        'sshKey',
        'Give a name to your ssh_key:'
      );
      name = sshKeyName;
    }

    if (!key && isTTY) {
      const {askSSHKey} = require('../../prompts');
      const {sshKey} = await askSSHKey();
      key = sshKey;
    }

    const config = {
      name,
      public_key: key
    };

    try {
      const {body} = await api.accountAddKey(config);
      if (flags.json) {
        this.log(styledJSON(body));
      } else {
        this.log(body.ssh_key.name, 'created!');
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

SSHKeysCreateCommand.description = `add new SSH key in your account`;

SSHKeysCreateCommand.flags = {
  name: flags.string({
    char: 'n',
    description: 'The name to give to the new SSH key in your account'
  }),
  key: flags.string({
    char: 'k',
    description: 'A string containing the entire public key'
  }),
  json: flags.boolean({char: 'j', description: 'Output in json format'})
};

module.exports = SSHKeysCreateCommand;
