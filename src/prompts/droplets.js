const {prompt} = require('enquirer');

// Check https://github.com/enquirer/enquirer/issues/13#issuecomment-447602031
prompt.on('cancel', () => process.exit());

/**
 * @param  {Array} sizes - Available droplet sizes
 * @returns {Promise} prompt - Returns a prompt
 */
const askDropletSize = sizes =>
  prompt({
    type: 'select',
    name: 'dropletSize',
    message: 'Select droplet size',
    choices: sizes
  });

const askDropletImage = images => {
  return prompt({
    type: 'autocomplete',
    name: 'dropletImage',
    message: 'Select droplet image',
    choices: images
  });
};

const askSSHKey = keys => {
  return prompt({
    type: 'multiselect',
    name: 'sshKey',
    message: 'Select the SSH keys you want to embed',
    choices: keys
  });
};

const askAdditionalOptions = () => {
  return prompt({
    type: 'multiselect',
    name: 'additionalOptions',
    message: 'Select the features you want to enable',
    choices: [
      {
        name: 'ipv6',
        message: 'IPv6'
      },
      {
        name: 'monitoring',
        message: 'Monitoring'
      },
      {
        name: 'backups',
        message: 'Droplet Backups'
      }
    ]
  });
};

module.exports = {
  askSSHKey,
  askDropletSize,
  askDropletImage,
  askAdditionalOptions
};
