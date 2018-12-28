const {expect, test} = require('@oclif/test');

describe('projects:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/projects?page=1').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['projects:list'])
    .it('shows no projects message', ctx => {
      expect(ctx.stdout).to.contain(
        "You don't have any projects under your account\n"
      );
    });

  const expectedOutput = `Name  Description                         Purpose                         Is default \nshark A CLI to Interact with DigitalOcean Operational / Developer tooling true       \n`;

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/projects?page=1').reply(200, {
        projects: [
          {
            name: 'shark',
            description: 'A CLI to Interact with DigitalOcean',
            purpose: 'Operational / Developer tooling',
            environment: '',
            is_default: true
          }
        ],
        meta: {
          total: 1
        }
      })
    )
    .stdout()
    .command(['projects:list'])
    .it('lists projects', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
