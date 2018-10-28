const chalk = require('chalk');
const { DoAPI, spinner, callMatchingMethod } = require('../util');
const { confirmDelete } = require('../prompts/delete');
const Domain = require('../prompts/domain');

module.exports.init = async () => {
  try {
    const answers = await Domain.init();
    callMatchingMethod(module.exports, answers.domain);
  } catch (error) {
    console.error(error);
  }
};

module.exports.create = async () => {
  try {
    const answers = await Domain.create();
    spinner.start(`Creating ${answers.domain_name}...`);
    const {
      body: { domain }
    } = await DoAPI.domainsCreate(answers.domain_name);
    if (domain.name) {
      spinner.succeed(`${chalk.bold(domain.name)} is created. 🎉`);
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.delete = async () => {
  try {
    const answers = await Domain.delete();
    if (answers.domains.length > 0) {
      const { delete_domain } = await confirmDelete('domain');
      if (delete_domain) {
        spinner.start('Deleting your domain...');
        answers.domains.map(async domain => {
          try {
            const data = await DoAPI.domainsDelete(domain);
            if (data.response.statusCode === 204) {
              spinner.succeed(`${domain} is deleted`);
            }
          } catch (error) {
            spinner.fail(`failed to delete ${domain}`);
            console.error(error.message);
          }
        });
      }
    } else {
      console.log(
        'Please select atleast one domain to perform this operation!'
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(error);
  }
};

module.exports.list = async () => {
  try {
    spinner.start('Loading domains...');
    const data = await DoAPI.domainsGetAll();
    spinner.stop();
    if (data.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any domains');
    } else {
      data.body.domains.map((domain, index) => {
        return console.log(
          chalk.gray(index + 1 + '. ') + chalk.bold.underline(domain.name)
        );
      });
    }
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};
