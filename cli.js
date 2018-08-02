#!/usr/bin/env node

// =============  REQUIRE STATEMENTS ==================

const { initAccount, config } = require('./util');
const argv = require('./argv');

initAccount();

if (config.has('do_api_access_token')) {
  argv();
}
