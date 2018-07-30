const inquirer = require('inquirer');
const chalk = require('chalk');
module.exports = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'create',
        message: 'What do you want to create?',
        choices: ['Droplet', 'Spaces', 'Domain']
      }
    ];

    return inquirer.prompt(questions);
  },
  accessToken: () => {
    const questions = [
      {
        type: 'input',
        message: chalk.yellow('Please provide your access token:'),
        name: 'do_api_access_token'
      }
    ];

    return inquirer.prompt(questions);
  },
  domain: () => {
    const questions = [
      {
        type: 'input',
        name: 'domain_name',
        message: 'Enter your domain name:',
        filter: input => input.toLowerCase()
      }
    ];
    return inquirer.prompt(questions);
  },
  droplet: () => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What should we call your Droplet?'
      },
      {
        type: 'list',
        name: 'image',
        message: 'Which Distribution do you want to use?',
        choices: [
          {
            name: 'Ubuntu 18.4.1 x64',
            value: 'ubuntu-18-04-x64'
          },
          {
            name: 'Ubuntu 16.4.4 x64',
            value: 'ubuntu-16-04-x64'
          },
          {
            name: 'CentOS 7.5 x64',
            value: 'centos-7-x64'
          },
          {
            name: 'CentOS 6.9 x64',
            value: 'centos-6-x64'
          }
        ]
      },
      {
        type: 'list',
        name: 'size',
        message: 'How stronger your computer should be?',
        choices: [
          {
            name: '1GB-1vCPU-25GBSSD-1TBtransfer-$5/mo',
            value: 's-1vcpu-1gb'
          },
          {
            name: '2GB-1vCPU-50GBSSD-2TBtransfer-$10/mo',
            value: 's-1vcpu-1gb'
          },
          {
            name: '3GB-1vCPU-60GBSSD-3TBtransfer-$15/mo',
            value: 's-1vcpu-1gb'
          },
          {
            name: '2GB-2vCPU-60GBSSD-3TBtransfer-$15/mo',
            value: 's-1vcpu-1gb'
          }
        ]
      },
      {
        type: 'list',
        name: 'region',
        message: 'Choose your data center!',
        choices: [
          {
            name: 'New York 1',
            value: 'nyc1'
          },
          {
            name: 'Singapore 1',
            value: 'sgp1'
          },
          {
            name: 'London 1',
            value: 'lon1'
          },
          {
            name: 'New York 3',
            value: 'nyc3'
          },
          {
            name: 'Amsterdam 3',
            value: 'ams3'
          },
          {
            name: 'Frankfurt 1',
            value: 'fra1'
          },
          {
            name: 'Toronto 1',
            value: 'tor1'
          },
          {
            name: 'San Francisco 2',
            value: 'sfo2'
          },
          {
            name: 'Bangalore 1',
            value: 'blr1'
          }
        ]
      },
      // {
      //   type: 'checkbox',
      //   name: 'dropletAddOps',
      //   message: 'Add any additional options',
      //   choices: [
      //     new inquirer.Separator(' == Additional Options == '),
      //     {
      //       name: 'Private networking',
      //       value: true
      //     },
      //     {
      //       name: 'IPv6',
      //       value: true
      //     },
      //     {
      //       name: 'User data',
      //       value: true
      //     },
      //     {
      //       name: 'Monitoring',
      //       value: true
      //     }
      //   ]
      // },
      {
        type: 'input',
        name: 'tags',
        message: 'Add any droplet tags',
        filter: input => [input]
      }
      // {
      //   type: 'checkbox',
      //   name: 'clientSSHKeys',
      //   message: 'Select your SSH keys',
      //   choices: [new inquirer.Separator(' == Select your SSH Keys == ')]
      // },
      // {
      //   type: 'input',
      //   name: 'dropletsQuantity'
      // }
    ];

    return inquirer.prompt(questions);
  }
};
