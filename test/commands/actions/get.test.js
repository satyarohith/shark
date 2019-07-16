const {expect, test} = require('@oclif/test');

describe('actions:get', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/actions/123456789').reply(200, {
        action: {
          id: 123456789,
          status: 'completed',
          type: 'destroy',
          started_at: '2018-12-26T10:22:15Z',
          completed_at: '2018-12-26T10:22:23Z',
          resource_id: 123456789,
          resource_type: 'droplet',
          region: {
            name: 'Bangalore 1'
          }
        }
      })
    )
    .stdout()
    .command(['actions:get', '--id', '123456789'])
    .it('shows info about the action', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const expectedOutput = `ID: 123456789\nStatus: completed\nType: destroy\nStarted At: Wed, 26 Dec 2018 10:22:15 GMT\nCompleted At: Wed, 26 Dec 2018 10:22:23 GMT\nResource ID: 123456789\nRegion: Bangalore 1\n`;
});
