const {expect, test} = require('@oclif/test');

describe('droplets:backups', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api
        .post('/droplets/123456/actions', {type: 'enable_backups'})
        .reply(200, {
          action: {
            status: 'completed'
          }
        })
    )
    .stdout()
    .command(['droplets:backups', '--id', '123456', '--enable'])
    .it('shows successful request message', ctx => {
      const expectedOutput = `Request complete. Status: completed\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
