#!/usr/bin/env node

// =============  REQUIRE STATEMENTS ==================
const argv = require('yargs').argv;
const ConfigStore = require('configstore');
const pkg = require('./package.json');
const config = new ConfigStore(pkg.name);
const DigitalOcean = require('do-wrapper').default;
const chalk = require('chalk');

const Create = require('./create');
const Delete = require('./delete');
const List = require('./list');
const { verifyAccount } = require('./util');
if (!config.has('do_api_access_token')) {
  (async () => {
    try {
      let answers = await Create.accessToken();
      // If token is valid verifAccount sets the token
      await verifyAccount(answers.do_api_access_token, config);
    } catch (error) {
      console.log('Error while setting accessToken', error);
    }
  })();
}

const ACCESS_TOKEN = config.get('do_api_access_token');

const DoAPI = new DigitalOcean(ACCESS_TOKEN, 10);

async function createDroplet() {
  droplet = await Create.droplet();
  console.log(droplet.tags);
  console.log(`Creating ${droplet.name}...`);
  console.log('Here is dropletJSON:', droplet);
  DoAPI.dropletsCreate(droplet)
    .then(data => {
      console.log(data.body);
      let droplet = data.body.droplet;
      console.log(`Created ${droplet.name}! and its id is ${droplet.id}`);
    })
    .catch(error => {
      console.log(error);
      console.error(
        `An ${error.id} occurred while creating droplet: ${error.message}`
      );
    });
}

// listDroplets
function listDroplets() {
  DoAPI.dropletsGetAll().then(list => {
    if (list.body.droplets.length === 0) {
      console.log("Sorry you don't have any droplets");
    } else {
      console.log(`You have ${chalk.magenta(list.body.meta.total)} Droplets`);
      list.body.droplets.map(droplet => {
        console.log(
          `--------------------------------
  ${chalk.inverse('Name:')}   ${droplet.name}
  ${chalk.inverse('Id:')}     ${droplet.id}
  ${chalk.inverse('Memory:')} ${droplet.memory}
  ${chalk.inverse('Image:')}  ${droplet.image.slug}
  ${chalk.inverse('Status:')} ${droplet.status}
  ${chalk.inverse('Region:')} ${droplet.region.name}
           `
        );
      });
    }
  });
}

async function createDomain() {
  let answers = await Create.domain();
  DoAPI.domainsCreate(answers.domain_name)
    .then(data => {
      if (data.body.domain.name) {
        console.log(
          `Domain ${data.body.domain.name} has been successfully created. 🎉`
        );
      }
    })
    .catch(err =>
      console.error(
        `An ${err.id} occurred. Please try a valid name ${err.message}`
      )
    );
}

async function deleteDroplet() {
  try {
    let answers = await Delete.droplet();
    DoAPI.dropletsDelete(answers.droplet_id)
      .then(console.log(`Success fully deleted droplet ${answers.droplet_id}`))
      .catch(err => {
        console.log('An Error occurred while Creating droplet:', err);
      });
  } catch (error) {
    console.log('Error while Deleting droplet', error);
  }
}

// create
if (argv._[0] === 'create') {
  if (argv._[1] === 'droplet') {
    createDroplet();
  } else if (argv._[1] === 'domain') {
    createDomain();
  } else if (!argv._[1] && !argv._[2]) {
    Create.init();
  }
}
// delete

// list
if (argv._[0] === 'delete' && argv._[1] === 'droplet') {
  deleteDroplet();
}

if (argv._[0] === 'list' && argv._[1] === 'droplet') {
  listDroplets();
}
if (argv._[0] === 'delete' && argv._[1] === 'token') {
  if (config.has('do_api_access_token')) {
    config.delete('do_api_access_token');
    console.log(
      `${chalk.red(AccessToken)} Successfully Removed from your System!`
    );
  } else {
    console.log(chalk.red('You do not have any access tokens to remove'));
  }
}
