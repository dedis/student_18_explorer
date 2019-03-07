/* eslint-env mocha */
import { StatusResponse, Status } from '@dedis/cothority/status/proto'
import { Roster, ServerIdentity } from '@dedis/cothority/network/proto'
const assert = require('assert')
const Vue = require('./Vue')
const StatusTable = require('../../src/components/status/StatusTable.vue').default

const rpc = {
  getStatus (index) {
    switch (index) {
      case 0:
        return Promise.resolve(new StatusResponse({
          serverIdentity: { description: 'aa' },
          status: { Conode: new Status({ field: {} }), Generic: new Status({ field: {} }) }
        }))
      case 1:
        return Promise.resolve(new StatusResponse({
          serverIdentity: { description: 'bb' },
          status: {}
        }))
      default:
        return Promise.reject(new Error('test error'))
    }
  }
}

const roster = new Roster({
  list: [
    new ServerIdentity({ id: Buffer.from([]), address: 'a' }),
    new ServerIdentity({ id: Buffer.from([]), address: 'b' }),
    new ServerIdentity({ id: Buffer.from([]), address: 'c' })
  ],
  id: Buffer.from([]),
  aggregate: Buffer.from([])
})

const Constructor = Vue.extend(StatusTable)
const vm = new Constructor({
  propsData: {
    rpc,
    roster
  },
  props: ['rpc', 'roster']
})

describe('StatusTable component', function () {
  it('should fetch the status', async function () {
    const c = vm.$mount()

    assert.strictEqual(c.maxNumServer, 3)
    assert.strictEqual(c.items[0].name, 'a')

    // await the status request
    await c.promise

    assert.strictEqual(c.items[0].status, 'up')
    assert.strictEqual(c.items[0].name, 'aa')

    assert.strictEqual(c.items[1].status, undefined)
    assert.strictEqual(c.items[1].name, 'b')

    assert.strictEqual(c.items[2].status, 'down')
  })
})
