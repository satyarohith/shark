shark
=====

A CLI to interact with digitalocean

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/shark.svg)](https://npmjs.org/package/shark)
[![Downloads/week](https://img.shields.io/npm/dw/shark.svg)](https://npmjs.org/package/shark)
[![License](https://img.shields.io/npm/l/shark.svg)](https://github.com/satyarohith/shark/blob/master/package.json)

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
* [`shark actions:list`](#shark-actionslist)
* [`shark domains`](#shark-domains)
* [`shark domains:create`](#shark-domainscreate)
* [`shark domains:delete`](#shark-domainsdelete)
* [`shark domains:list`](#shark-domainslist)
* [`shark droplets:list`](#shark-dropletslist)
* [`shark help [COMMAND]`](#shark-help-command)
* [`shark token:delete`](#shark-tokendelete)

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

## `shark token:delete`

Delete previously set access token

```
USAGE
  $ shark token:delete
```

_See code: [src/commands/token/delete.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/token/delete.js)_
<!-- commandsstop -->
