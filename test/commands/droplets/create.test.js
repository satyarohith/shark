const {expect, test} = require('@oclif/test');

describe('droplets:create', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api
        .post('/droplets', {
          name: 'shark',
          image: 'ubuntu-18-10-x64',
          size: 's-1vcpu-1gb',
          region: 'blr1'
        })
        .reply(200, {
          droplet: {
            name: 'shark',
            region: {
              name: 'Bangalore 1'
            }
          }
        })
    )
    .stdout()
    .command([
      'droplets:create',
      '--name',
      'shark',
      '--image',
      'ubuntu-18-10-x64',
      '--size',
      's-1vcpu-1gb',
      '--region',
      'blr1',
      '--no-prompts'
    ])
    .it('shows successful create message', ctx => {
      const expectedOutput = `shark created at Bangalore 1\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
