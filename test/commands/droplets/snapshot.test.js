const {expect, test} = require('@oclif/test');

describe('droplets:snapshot', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api
        .post('/droplets/123456/actions', {type: 'snapshot', name: 'sharky'})
        .reply(201, {
          action: {
            status: 'in-progress'
          }
        })
    )
    .stdout()
    .command(['droplets:snapshot', '--id', '123456', '-n', 'sharky'])
    .it('shows successful snapshot request message', ctx => {
      const expectedOutput = `Request complete. Status: in-progress\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
