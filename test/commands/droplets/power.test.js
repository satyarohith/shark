const {expect, test} = require('@oclif/test');

describe('droplets:power', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api.post('/droplets/123456/actions', {type: 'power_off'}).reply(201, {
        action: {
          status: 'completed'
        }
      })
    )
    .stdout()
    .command(['droplets:power', '--id', '123456', '-f'])
    .it('shows successful request message', ctx => {
      const expectedOutput = `Your droplet will be powered off shortly.\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
