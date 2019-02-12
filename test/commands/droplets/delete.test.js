const {expect, test} = require('@oclif/test');

describe('droplets:delete', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.delete('/droplets/123456').reply(204)
    )
    .stdout()
    .command(['droplets:delete', '--id', '123456'])
    .it('shows successful delete message', ctx => {
      expect(ctx.stdout).to.contain('successfully deleted!\n');
    });
});
