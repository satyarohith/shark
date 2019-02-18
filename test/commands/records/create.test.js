const {expect, test} = require('@oclif/test');

describe('records:create', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .post('/domains/satyarohith.com/records', {
          type: 'A',
          name: '@',
          data: '1.1.1.1'
        })
        .reply(200, {
          domain_record: {}
        })
    )
    .stdout()
    .command([
      'records:create',
      '-D',
      'satyarohith.com',
      '-n',
      '@',
      '-t',
      'A',
      '-d',
      '1.1.1.1'
    ])
    .it('shows record created message', ctx => {
      expect(ctx.stdout).to.contain('Domain record created.\n');
    });
});
