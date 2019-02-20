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
    message: 'select droplet size:',
    choices: sizes
  });

const askDropletImage = () => {
  return prompt({
    type: 'autocomplete',
    name: 'dropletImage',
    message: 'select droplet image',
    choices: [
      'coreos-beta',
      'freebsd-10-3-x64-zfs',
      'freebsd-10-3-x64',
      'freebsd-11-1-x64',
      'freebsd-11-1-x64-zfs',
      'freebsd-10-4-x64-zfs',
      'freebsd-10-4-x64',
      'fedora-27-x64',
      'centos-6-x32',
      'debian-8-x64',
      'debian-8-x32',
      'fedora-28-x64',
      'fedora-28-x64-atomic',
      'centos-7-x64',
      'centos-6-x64',
      'freebsd-11-2-x64-zfs',
      'freebsd-11-2-x64',
      'ubuntu-18-10-x64',
      'rancheros',
      'ubuntu-14-04-x32',
      'ubuntu-14-04-x64',
      'ubuntu-18-04-x64',
      'coreos-alpha',
      'coreos-stable',
      'ubuntu-16-04-x32',
      'ubuntu-16-04-x64',
      'debian-9-x64'
    ]
  });
};

const askSSHKey = keys => {
  return prompt({
    type: 'multiselect',
    name: 'sshKey',
    message: 'select the keys you want to embed',
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
