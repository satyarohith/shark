#!/usr/bin/env node
'use strict';
const Create = require('./cmds/create');
const Delete = require('./cmds/delete');
const List = require('./cmds/list');
const { Init } = require('./cmds/init');
const { initAccount, callMatchingMethod, config } = require('./util');
const updateNotifier = require('update-notifier');
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
  delete - delete resources
  list   - list resources (when using list suffix 's' to resource_name)

resource_names:
  domain
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

same applies to list & delete as well
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
    case '-v':
    case '--version':
      console.log(pkg.version);
      break;
    case '-h':
    case '--help':
      console.log(help);
      break;
    default:
      Init();
      break;
  }
} else {
  initAccount();
}
