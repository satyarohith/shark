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
* [`shark domains:list`](#shark-domainslist)
* [`shark help [COMMAND]`](#shark-help-command)
* [`shark token:delete`](#shark-tokendelete)

## `shark domains:list`

List all domains in your account

```
USAGE
  $ shark domains:list

OPTIONS
  --json  output in json format
```

_See code: [src/commands/domains/list.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/domains/list.js)_

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

Deletes previously set access token

```
USAGE
  $ shark token:delete
```

_See code: [src/commands/token/delete.js](https://github.com/satyarohith/shark/blob/v0.0.0-development/src/commands/token/delete.js)_
<!-- commandsstop -->
