const {expect, test} = require('@oclif/test');

describe('volumes:create', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .post('/volumes', {
          name: 'shark',
          region: 'blr1',
          size_gigabytes: 10,
          description: 'A heartful CLI'
        })
        .reply(200, {
          volume: {
            name: 'shark'
          }
        })
    )
    .stdout()
    .command([
      'volumes:create',
      '-n',
      'shark',
      '-r',
      'blr1',
      '-d',
      'A heartful CLI',
      '-s',
      '10',
      '--no-prompts'
    ])
    .it('outputs successful create message', ctx => {
      expect(ctx.stdout).to.equal('shark created!\n');
    });
});
