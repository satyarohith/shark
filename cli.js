#!/usr/bin/env node

// =============  REQUIRE STATEMENTS ==================
const argv = require('yargs').argv;
const chalk = require('chalk');
const inquirer = require('inquirer');
const ConfigStore = require('configstore');
const pkg = require('./package.json');
const DigitalOcean = require('do-wrapper').default;

const config = new ConfigStore(pkg.name);

const Create = require('./questions/create');
const Delete = require('./questions/delete');
const List = require('./questions/list');

if (!config.has('do_api_access_token')) {
  (async () => {
    try {
      let answers = await Create.accessToken();
      config.set('do_api_access_token', answers.do_api_access_token);
      // Verify access token after/before setting config
    } catch (error) {
      console.log('Error ACCESS_TOKEN:', error);
    }
  })();
}

const ACCESS_TOKEN = config.get('do_api_access_token');

const DoAPI = new DigitalOcean(ACCESS_TOKEN, 10);

// Create Droplet JSON example
// {
//   "name": "example.com",
//   "region": "nyc3",
//   "size": "s-1vcpu-1gb",
//   "image": "ubuntu-16-04-x64",
//   "ssh_keys": null,
//   "backups": false,
//   "ipv6": true,
//   "user_data": null,
//   "private_networking": null,
//   "volumes": null,
//   "tags": [
//     "web"
//   ]
// }

// ==================== Actions / Function Declarations ====================
// create droplet
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
  console.log('List Droplet fnc ran');
  DoAPI.dropletsGetAll().then(list => {
    if (list.body.droplets.length === 0) {
      console.log("Sorry you don't have any droplets");
    } else {
      list.body.droplets.map(droplet => {
        console.log(`Name: ${droplet.name} id: ${droplet.id}`);
      });
    }
  });
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

// Getting ssh Key
// let ssh_keys;
// Do.accountGetKeys().then(data => {
//   if (data.body.ssh_keys) {
//     ssh_keys = data.body.ssh_keys;
//     console.log(ssh_keys);
//   }
// });
// Getting images (Working but cannot filter)// TODO: @satyarohith
// let query = {
//   type: 'distribution',
//   page: 5
// };
// Do.imagesGetAll(query)
//   .then(data => console.log(data.body))
//   .catch(err => console.error(err));
//============================== Questions ==============================

//============================== Invokations Here ==============================
if (argv._.includes('delete') && argv._.includes('droplet')) {
  deleteDroplet();
}
if (argv._.includes('create') && argv._.includes('droplet')) {
  createDroplet();
}
