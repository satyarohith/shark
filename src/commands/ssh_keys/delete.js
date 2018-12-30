const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SSHKeysDeleteCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SSHKeysDeleteCommand);
    const {isTTY} = process.stdout;
    const {api} = this;
    let {id, fingerprint} = flags;

    if (!id && !fingerprint && isTTY) {
      const {askID} = require('../../prompts');
      const {keyID} = await askID('key');
      id = keyID;
    }

    try {
      const keyID = fingerprint ? fingerprint : id;

      const {response} = await api.accountDeleteKey(keyID);

      if (response.statusCode === 204) {
        this.log('successfully deleted!');
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

SSHKeysDeleteCommand.description = 'remove ssh_key from your account';

SSHKeysDeleteCommand.flags = {
  id: flags.string({char: 'i', description: 'use id of the key to delete'}),
  fingerprint: flags.string({
    char: 'f',
    description: 'use fingerprint of the key to delete'
  })
};

module.exports = SSHKeysDeleteCommand;
