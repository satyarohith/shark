#!/usr/bin/env node

// =============  REQUIRE STATEMENTS ==================
const argv = require('yargs').argv;

const { initAccount } = require('./util');
const Create = require('./actions/create');
const Delete = require('./actions/delete');
const List = require('./actions/list');
const { Init } = require('./actions/init');
initAccount();

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
          Create.ssh_key();
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
          Delete.droplet(DoAPI);
          break;
        case 'token':
          Delete.token();
          break;
        case 'domain':
          Delete.domain(DoAPI);
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
