const {expect, test} = require('@oclif/test');

describe('droplets:shutdown', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api.post('/droplets/123456/actions', {type: 'shutdown'}).reply(200, {
        action: {}
      })
    )
    .stdout()
    .command(['droplets:shutdown', '--id', '123456'])
    .it('shows successful request message', ctx => {
      const expectedOutput = `Request complete. Your droplet will shutdown soon.\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
