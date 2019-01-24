shark
=====

A CLI to interact with digitalocean

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/shark.svg)](https://npmjs.org/package/shark)
[![Downloads/week](https://img.shields.io/npm/dw/shark.svg)](https://npmjs.org/package/shark)
[![License](https://img.shields.io/npm/l/shark.svg)](https://github.com/satyarohith/shark/blob/master/package.json)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Known Vulnerabilities](https://snyk.io/test/github/satyarohith/shark/badge.svg?targetFile=package.json)](https://snyk.io/test/github/satyarohith/shark?targetFile=package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g shark
$ shark COMMAND
running command...
$ shark (-v|--version|version)
shark/0.0.0-development linux-x64 node-v10.9.0
$ shark --help [COMMAND]
USAGE
  $ shark COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`shark actions:get`](#shark-actionsget)
* [`shark actions:list`](#shark-actionslist)
* [`shark domains`](#shark-domains)
* [`shark domains:create`](#shark-domainscreate)
* [`shark domains:delete`](#shark-domainsdelete)
* [`shark domains:list`](#shark-domainslist)
* [`shark droplets:create`](#shark-dropletscreate)
* [`shark droplets:delete`](#shark-dropletsdelete)
* [`shark droplets:list`](#shark-dropletslist)
* [`shark help [COMMAND]`](#shark-help-command)
* [`shark projects:create`](#shark-projectscreate)
* [`shark projects:list`](#shark-projectslist)
* [`shark ssh_keys:create`](#shark-ssh-keyscreate)
* [`shark ssh_keys:delete`](#shark-ssh-keysdelete)
* [`shark ssh_keys:get`](#shark-ssh-keysget)
* [`shark ssh_keys:list`](#shark-ssh-keyslist)
* [`shark token:delete`](#shark-tokendelete)

## `shark actions:get`

get details about a specific action

```
USAGE
  $ shark actions:get

OPTIONS
  -i, --id=id  pass the action id
  --json       output in json format
```

_See code: [src/commands/actions/get.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/actions/get.js)_

## `shark actions:list`

List all executed actions

```
USAGE
  $ shark actions:list

OPTIONS
  -j, --json         output in json format
  -p, --page=page    specific page to request
  -x, --extended     show extra columns
  --columns=columns  only show provided columns (comma-seperated)
  --csv              output is csv format
  --filter=filter    filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/actions/list.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/actions/list.js)_

## `shark domains`

Perform domain related operations

```
USAGE
  $ shark domains
```

_See code: [src/commands/domains/index.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/domains/index.js)_

## `shark domains:create`

Create a domain in DigitalOcean dns

```
USAGE
  $ shark domains:create

OPTIONS
  -i, --ip=ip      IP address
  -n, --name=name  Domain name
  --json           output in json format

DESCRIPTION
  Example:
  $ shark domains:create --name=satyarohith.com --ip=1.1.1.1
```

_See code: [src/commands/domains/create.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/domains/create.js)_

## `shark domains:delete`

Delete domains from DigitalOcean

```
USAGE
  $ shark domains:delete

OPTIONS
  -n, --name=name  domain name
```

_See code: [src/commands/domains/delete.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/domains/delete.js)_

## `shark domains:list`

List all domains in your account

```
USAGE
  $ shark domains:list

OPTIONS
  --json  output in json format
```

_See code: [src/commands/domains/list.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/domains/list.js)_

## `shark droplets:create`

create a droplet

```
USAGE
  $ shark droplets:create

OPTIONS
  -I, --ipv6                 IPv6 public address
  -P, --private_networking   private networking
  -b, --backups
  -d, --user_data=user_data  user data to upload
  -i, --image=image          (required) operating system to use
  -j, --json                 output in json format
  -k, --ssh_keys=ssh_keys    ssh_key to use
  -m, --monitoring           enable droplet monitoring
  -n, --name=name            (required) name of the droplet
  -r, --region=region        (required) region of the droplet
  -s, --size=size            (required) size of the droplet
  --tags=tags
  --volumes=volumes
```

_See code: [src/commands/droplets/create.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/droplets/create.js)_

## `shark droplets:delete`

delete a droplet

```
USAGE
  $ shark droplets:delete

OPTIONS
  -i, --id=id  pass the id of the droplet

DESCRIPTION
  Examples:

  delete a single droplet:
  shark droplets:delete --id 123456
```

_See code: [src/commands/droplets/delete.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/droplets/delete.js)_

## `shark droplets:list`

List droplets under your account

```
USAGE
  $ shark droplets:list

OPTIONS
  -j, --json         output in json format
  -p, --page=page    specific page to request
  -x, --extended     show extra columns
  --columns=columns  only show provided columns (comma-seperated)
  --csv              output is csv format
  --filter=filter    filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/droplets/list.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/droplets/list.js)_

## `shark help [COMMAND]`

display help for shark

```
USAGE
  $ shark help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `shark projects:create`

create a project

```
USAGE
  $ shark projects:create

OPTIONS
  -d, --description=description  The description of the project. (max 255 char)
  -e, --environment=environment  The environment of the project's resources. (development|staging|production)
  -n, --name=name                The human-readable name for the project. (unique) (max 175 char)
  -p, --purpose=purpose          The description of the project. (max 255 char)
```

_See code: [src/commands/projects/create.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/projects/create.js)_

## `shark projects:list`

list projects under your account

```
USAGE
  $ shark projects:list

OPTIONS
  -j, --json         output in json format
  -p, --page=page    specific page to request
  -x, --extended     show extra columns
  --columns=columns  only show provided columns (comma-seperated)
  --csv              output is csv format
  --filter=filter    filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/projects/list.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/projects/list.js)_

## `shark ssh_keys:create`

add new SSH key in your account

```
USAGE
  $ shark ssh_keys:create

OPTIONS
  -j, --json       Output in json format
  -k, --key=key    A string containing the entire public key
  -n, --name=name  The name to give to the new SSH key in your account
```

_See code: [src/commands/ssh_keys/create.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/ssh_keys/create.js)_

## `shark ssh_keys:delete`

remove ssh_key from your account

```
USAGE
  $ shark ssh_keys:delete

OPTIONS
  -f, --fingerprint=fingerprint  use fingerprint of the key to delete
  -i, --id=id                    use id of the key to delete
```

_See code: [src/commands/ssh_keys/delete.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/ssh_keys/delete.js)_

## `shark ssh_keys:get`

get public_key by id/fingerprint

```
USAGE
  $ shark ssh_keys:get

OPTIONS
  -f, --fingerprint=fingerprint  get ssh_key by fingerprint
  -i, --id=id                    get ssh_key by id
  -j, --json                     output in json format
```

_See code: [src/commands/ssh_keys/get.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/ssh_keys/get.js)_

## `shark ssh_keys:list`

list all SSH Keys under your account

```
USAGE
  $ shark ssh_keys:list

OPTIONS
  -j, --json         output in json format
  -p, --page=page    specific page to request
  -t, --tag=tag      pass tag name to retrieve keys associated with the tag
  -x, --extended     show extra columns
  --columns=columns  only show provided columns (comma-seperated)
  --csv              output is csv format
  --filter=filter    filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/ssh_keys/list.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/ssh_keys/list.js)_

## `shark token:delete`

Delete previously set access token

```
USAGE
  $ shark token:delete
```

_See code: [src/commands/token/delete.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/token/delete.js)_
<!-- commandsstop -->
