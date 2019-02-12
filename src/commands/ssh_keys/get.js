const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class SSHKeysGetCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(SSHKeysGetCommand);
    const {api, styledJSON} = this;
    const {isTTY} = process.stdout;
    let {json, id, fingerprint} = flags;

    if (!id && !fingerprint && isTTY) {
      const {askID} = require('../../prompts');
      const {keyID} = await askID('key');
      id = keyID;
    }

    try {
      let body;

      if (id) {
        const data = await api.accountGetKeyById(id);
        body = data.body;
      } else if (fingerprint) {
        const data = await api.accountGetKeyByFingerprint(fingerprint);
        body = data.body;
      }

      if (json) {
        this.log(styledJSON(body));
      } else {
        this.log(body.ssh_key.public_key);
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

SSHKeysGetCommand.description = 'get public_key by id/fingerprint';

SSHKeysGetCommand.flags = {
  json: flags.boolean({char: 'j', description: 'output in json format'}),
  id: flags.string({char: 'i', description: 'get ssh_key by id'}),
  fingerprint: flags.string({
    char: 'f',
    description: 'get ssh_key by fingerprint'
  })
};

module.exports = SSHKeysGetCommand;
