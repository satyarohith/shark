const {expect, test} = require('@oclif/test');

describe('snapshots:get', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/snapshots/123456789').reply(200, {
        snapshot: {
          id: '123456789',
          name: 'shark-snap',
          regions: ['blr1'],
          created_at: '2016-09-29T17:41:42Z',
          resource_id: '87654321',
          resource_type: 'volume',
          min_disk_size: 10,
          size_gigabytes: 0
        }
      })
    )
    .stdout()
    .command(['snapshots:get', '--id', '123456789'])
    .it('shows info about snapshot', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const expectedOutput = `ID: 123456789\nName: shark-snap\nSize Gigabytes: 0\nMin disk size: 10\nCreated At: Invalid Date\nResource Type: volume\nResource ID: 87654321\nRegions: [ \'blr1\' ]\n`;
});
