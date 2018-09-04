#!/usr/bin/env node
'use strict';
const Create = require('./actions/create');
const Delete = require('./actions/delete');
const List = require('./actions/list');
const { Init } = require('./actions/init');
const { initAccount, callMatchingMethod, config } = require('./util');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const notifier = updateNotifier({ pkg });

const argv = process.argv.slice(2);

notifier.notify({ isGlobal: true });

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
    default:
      Init();
      break;
  }
} else {
  initAccount();
}
