const { expect, test } = require('@oclif/test')

describe('droplets:password', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api.post('/droplets/123456/actions', { type: 'password_reset' }).reply(201, {
        action: {
          status: 'in-progress'
        }
      })
    )
    .stdout()
    .command(['droplets:password', '--id', '123456',])
    .it('shows password reset status', ctx => {
      const expectedOutput = `Password reset status: in-progress\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
})
