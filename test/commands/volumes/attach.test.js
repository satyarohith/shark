const {expect, test} = require('@oclif/test');

describe('volumes:attach', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .post('/volumes/12345/actions', {
          type: 'attach',
          droplet_id: 54321,
          region: 'blr1'
        })
        .reply(200, {
          action: {
            status: 'in-progress'
          }
        })
    )
    .stdout()
    .command(['volumes:attach', '-i', '12345', '-r', 'blr1', '-d', '54321'])
    .it('outputs successful request message', ctx => {
      expect(ctx.stdout).to.equal(
        'The request has been initiated. Status: in-progress\n'
      );
    });
});
