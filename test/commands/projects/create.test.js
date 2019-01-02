const {expect, test} = require('@oclif/test');

describe('projects:create', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .post('/projects', {
          name: 'shark',
          description: 'CLI to Interact with DigitalOcean',
          purpose: 'developer tools',
          environment: 'Development'
        })
        .reply(200, {
          project: {
            name: 'shark',
            description: 'CLI to Interact with DigitalOcean',
            purpose: 'developer tools',
            environment: 'Development',
            is_default: true
          }
        })
    )
    .stdout()
    .command([
      'projects:create',
      '--name',
      'shark',
      '-d',
      'CLI to Interact with DigitalOcean',
      '-p',
      'developer tools',
      '-e',
      'Development'
    ])
    .it('shows created project details', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
  const expectedOutput = `Project created!\nName: shark\nDescription: CLI to Interact with DigitalOcean\nPurpose: developer tools\nEnvironment: Development\nIs default: true\n`;
});
