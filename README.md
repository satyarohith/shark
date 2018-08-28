# Shark

A Commandline Tool to Interact with Digitalocean API.

## Installation

If you would like to test it out,
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
### Create
<br/>

To create droplet
```sh
shark create droplet
```

To create domain
```sh
shark create domain
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

### Delete

To delete droplet
```sh
shark delete droplet
```

To delete domain
```sh
shark delete domain
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
### List
You can list all available resources under your account.
<br/>
To list domains
```sh
shark list domains
```

To list droplets
```
shark list droplets
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