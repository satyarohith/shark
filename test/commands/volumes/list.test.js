const {expect, test} = require('@oclif/test');

describe('volumes:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/volumes').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['volumes:list'])
    .it('shows 0 volumes message', ctx => {
      expect(ctx.stdout).to.contain('You have 0 volumes\n');
    });

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/volumes').reply(200, {
        links: {
          pages: {}
        },
        meta: {
          total: 1
        },
        volumes: [
          {
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
        ]
      })
    )
    .stdout()
    .command(['volumes:list'])
    .it('lists volume successfully', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});

const expectedOutput = `Name  ID                                    Region      Description        Size gigabytes \nshark a12b123b-45cd-67e8-91f2-3g45hi67j8910 Bangalore 1 It\'s a test volume 10             \n`;
