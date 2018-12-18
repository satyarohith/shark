# Shark

A CLI to Interact with DigitalOcean.

[![npm version](https://img.shields.io/npm/v/shark.svg)](https://npm.im/shark)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![npm downloads](https://img.shields.io/npm/dm/shark.svg)](https://npm.im/shark)
[![Known Vulnerabilities](https://snyk.io/test/github/satyarohith/shark/badge.svg?targetFile=package.json)](https://snyk.io/test/github/satyarohith/shark?targetFile=package.json)

<div align="center">
<img src="demo.gif" >
</div>

A rewrite of `shark` utilising  [oclif](https://oclif.io) is planned.

## Installation
Install [Node.js](https://nodejs.org/) and then run this command
```sh
npm install -g shark
```
## Usage
To get started
```sh
shark
```
It will ask for DigitalOcean Personal Access Token for the first time and then you can perform tasks interactively.

[Learn How to create a Personal Access Token](https://www.digitalocean.com/docs/api/create-personal-access-token/).

## Skip Prompts

### Create
<br/>

To create droplet
```sh
shark create droplet
```


To create snapshot
```sh
shark create snapshot
```


To create ssh_key
```sh
shark create ssh_key
```

To create floating_ip
```sh
shark create floating_ip
```

To create a volume
```sh
shark create volume
```

### Domain

To create domain
```sh
shark domain create
```

To delete domain
```sh
shark domain delete
```

To list domains
```sh
shark domains list
```

### Delete

Please make sure *you know what you are doing* while performing `delete` operations.

To delete droplet
```sh
shark delete droplet
```

To delete snapshot
```sh
shark delete snapshot
```

To delete ssh_key
```sh
shark delete ssh_key
```

To delete floating_ip
```sh
shark delete floating_ip
```

To delete a volume
```sh
shark delete volume
```

To delete the token you have added
```sh
shark delete token
```
### List
You can list all available resources under your account.
<br/>


To list droplets
```
shark list droplets
```

To list droplets
```
shark list snapshots
```

To list ssh_keys
```
shark list ssh_keys
```

To list floating_ips
```sh
shark list floating_ips
```

To list volumes
```sh
shark list volumes
```

## Todo
- [ ] Tests

## Thanks to
 - [Aleafs](https://github.com/aleafs) - For generously donating npm package name `shark`.
 - [Packages Contributors](https://github.com/satyarohith/shark/network/dependencies)

## License
MIT
