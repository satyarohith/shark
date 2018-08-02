#!/usr/bin/env node

const { initAccount, config } = require('./util');
const shark = require('./shark');

initAccount();

if (config.has('do_api_access_token')) {
  shark();
}
