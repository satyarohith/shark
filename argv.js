const argv = require('yargs').argv;
const Create = require('./actions/create');
const Delete = require('./actions/delete');
const List = require('./actions/list');
const { Init } = require('./actions/init');

module.exports = () => {
  switch (argv._[0]) {
    case 'create':
      {
        switch (argv._[1]) {
          case 'droplet':
            Create.droplet();
            break;
          case 'domain':
            Create.domain();
            break;
          case 'ssh_key':
          case 'sshkey':
            Create.sshkey();
            break;
          default:
            Create.init();
            break;
        }
      }
      break;
    case 'delete':
      {
        switch (argv._[1]) {
          case 'droplet':
            Delete.droplet();
            break;
          case 'token':
            Delete.token();
            break;
          case 'domain':
            Delete.domain();
            break;
          case 'ssh_key':
          case 'sshkey':
            Delete.sshkey();
            break;
          default:
            Delete.init();
            break;
        }
      }
      break;
    case 'list':
      {
        switch (argv._[1]) {
          case 'droplet':
          case 'droplets':
            List.droplets();
            break;
          case 'domain':
          case 'domains':
            List.domains();
            break;
          case 'sshkeys':
          case 'ssh_key':
          case 'ssh_keys':
          case 'sshkey':
            List.sshKeys();
            break;
          default:
            List.init();
            break;
        }
      }
      break;
    default:
      Init();
      break;
  }
};
