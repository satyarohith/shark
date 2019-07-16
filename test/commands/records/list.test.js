const {expect, test} = require('@oclif/test');

describe('records:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/domains/satyarohith.com/records?tag_name=&page=1').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['records:list', '-n', 'satyarohith.com'])
    .it('shows no records found message', ctx => {
      expect(ctx.stdout).to.contain('No records found.\n');
    });

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/domains/satyarohith.com/records?tag_name=&page=1').reply(200, {
        domain_records: [
          {
            id: 123456,
            type: 'NS',
            name: '@',
            data: 'ns1.digitalocean.com',
            priority: null,
            port: null,
            ttl: 1800,
            weight: null,
            flags: null,
            tag: null
          }
        ],
        links: {},
        meta: {
          total: 1
        }
      })
    )
    .stdout()
    .command(['records:list', '-n', 'satyarohith.com', '--no-truncate'])
    .it('lists records', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});

const expectedOutput = `ID     Type Name Data                 Priority Port Ttl  Weight Flags Tag  \n123456 NS   @    ns1.digitalocean.com null     null 1800 null   null  null \n`;
