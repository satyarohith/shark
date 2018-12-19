#!/usr/bin/env node
'use strict';
const updateNotifier = require('update-notifier');
const Create = require('./cmds/create');
const Delete = require('./cmds/delete');
const List = require('./cmds/list');
const Domain = require('./cmds/domain');
const { init } = require('./cmds/init');
const { initAccount, callMatchingMethod, config } = require('./util');
const pkg = require('./package.json');

const notifier = updateNotifier({ pkg });

notifier.notify({ isGlobal: true });

const argv = process.argv.slice(2);

const help = `
All operations can be performed interactively by just typing 'shark'
but incase you need to skip through few prompts, you can use the below:

$ shark [cmds] [resource_name]

cmds:
  create - create resources, you can skip to the resource prompt by passing resource_name
  domain - all domain related operations.
  delete - delete resources
  list   - list resources (when using list suffix 's' to resource_name)

resource_names:
  droplet
  ssh_key
  volume
  floating_ip

examples:

$ shark
-> Perform operations interactively

$ shark create
-> skips to create interactive ui

$ shark create droplet
-> skips to droplet creation step

$ shark domain create
-> skips to domain creation step

same applies to list & delete as well

To know more please visit https://git.io/sharkcli#shark
`;

if (config.has('do_api_access_token')) {
  switch (argv[0]) {
    case 'create':
      callMatchingMethod(Create, argv[1]);
      break;
    case 'delete':
      callMatchingMethod(Delete, argv[1]);
      break;
    case 'list':
      callMatchingMethod(List, argv[1]);
      break;
    case 'domain':
      callMatchingMethod(Domain, argv[1]);
      break;
    case '-v':
    case '--version':
      console.log(pkg.version);
      break;
    case '-h':
    case '--help':
      console.log(help);
      break;
    default:
      init();
      break;
  }
} else {
  initAccount();
}
