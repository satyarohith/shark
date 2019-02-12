const {expect, test} = require('@oclif/test');

describe('volumes:get', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/volumes/12345').reply(200, {
        volume: {
          id: 'a12b123b-45cd-67e8-91f2-3g45hi67j8910',
          name: 'shark',
          created_at: '2019-02-03T12:10:12Z',
          description: "It's a test volume",
          droplet_ids: [],
          region: {
            name: 'Bangalore 1'
          },
          size_gigabytes: 10,
          filesystem_type: '',
          filesystem_label: '',
          tags: []
        }
      })
    )
    .stdout()
    .command(['volumes:get', '-i', '12345'])
    .it('shows details of a volume', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});

const expectedOutput = `Name: shark
Desc: It's a test volume
Droplets: []
Region: Bangalore 1
Size: 10GiB
FS Type: \n`;
