const Nfto = artifacts.require('Nfto')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Nfto', async accounts => {
  let nfto

  before(async() => {
    nfto = await Nfto.deployed()
  })

  describe('contract deployment', async () => {
    it('deploys successfully', async() => {
      const address = await nfto.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has correct name', async() => {
      const name = await nfto.name()
      assert.equal(name, 'Nfto')
    })
  })

  describe('items', async() => {
    let result, event

    it('mints new item', async() => {
      result = await nfto.mintItem(100000000000000, 'New item', 'Test item', 'ertq335564')
      event = result.logs[1].args
      assert.equal(event.id.toNumber(), 1)
      assert.equal(event.name, 'New item')
      assert.equal(event.description, 'Test item')
    })

    it('token has correct owner', async() => {
      const owner = await nfto.ownerOf(1)
      assert.equal(event.owner, owner)
    })
  })
})

