const {expect, test} = require('@oclif/test');

describe('volumes:delete', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.delete('/volumes/123456').reply(204)
    )
    .stdout()
    .command(['volumes:delete', '--id', '123456'])
    .it('shows successful delete message', ctx => {
      expect(ctx.stdout).to.contain('successfully deleted!\n');
    });
});
