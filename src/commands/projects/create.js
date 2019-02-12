const {flags} = require('@oclif/command');
const BaseCommand = require('../../base');

class CreateCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateCommand);
    const {isTTY} = process.stdout;
    const {api, styledJSON} = this;
    const {name, description, purpose, environment} = flags;
    let projectData = {
      name,
      description,
      purpose,
      environment
    };

    if ((!name || !purpose) && isTTY) {
      const {askProjectDetails} = require('../../prompts/projects');
      const {project} = await askProjectDetails(
        name,
        description,
        purpose,
        environment
      );
      projectData = project;
    }

    try {
      const {body} = await api.projectsCreate(projectData);
      if (flags.json) {
        this.log(styledJSON(body));
      } else {
        const {project} = body;
        this.log('Project created!');
        this.log('Name:', project.name);
        this.log('Description:', project.description);
        this.log('Purpose:', project.purpose);
        this.log('Environment:', project.environment);
        this.log('Is default:', project.is_default);
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

CreateCommand.description = 'create a project';

CreateCommand.flags = {
  name: flags.string({
    char: 'n',
    description:
      'The human-readable name for the project. (unique) (max 175 char)'
  }),
  description: flags.string({
    char: 'd',
    description: 'The description of the project. (max 255 char)'
  }),
  purpose: flags.string({
    char: 'p',
    description: 'The description of the project. (max 255 char)'
  }),
  environment: flags.string({
    char: 'e',
    description:
      "The environment of the project's resources. (development|staging|production)"
  })
};

module.exports = CreateCommand;
