/* eslint-env mocha */
import { misc } from '@dedis/cothority'
const assert = require('assert')
const Vue = require('vue').default
const BlockInfo = require('../../src/components/BlockInfo.vue').default
const blocks = require('./blocks.js')

var vm
var text

// Mount the instance
before(function () {
  const Constructor = Vue.extend(BlockInfo)
  vm = new Constructor({
    propsData: {
      blocks,
      $route: {
        params: {
          hash: '0x44a47649ce686afb399d81f199d81acfad46e68bfde1420b6379886b97a9f88f'
        }
      }
    },
    props: ['blocks', '$route']
  }).$mount()
  text = vm.$el.textContent
})

// Inspect the render output
describe('A simple block info page', function () {
  it('chooses the right block to display', function () {
    const block = vm.$el.__vue__.block
    assert.deepStrictEqual(block.hash, blocks[0].hash)
  })
  it('displays the hash of the block', function () {
    assert.ok(text.includes('0x44a47649ce686a'))
  })
  it('displays the block data hex dump', function () {
    assert.ok(text.includes('00000000: 6f6e 65                                  one'))
  })
  it('displays the hash of the backwards link', function () {
    assert.ok(text.includes('0xe61a2e2dd878d176767f783593871d052287f7f684a4c0350cd9caafecba6d4c'))
  })
  it('displays the uuid of the verifier', function () {
    assert.ok(text.includes('a7f6cdb7-47f8-56b4-aff5-ece35a882489'))
  })
  it('displays the roster uuid', function () {
    assert.ok(text.includes('d01e34dc-e4bf-56f1-b88a-ad428f26fef5'))
  })
  it('has a working toUUID method', function () {
    const toUUID = vm.$el.__vue__.toUUID
    assert.strictEqual(toUUID(misc.uint8ArrayToHex(blocks[0].verifiers[0])), 'a7f6cdb7-47f8-56b4-aff5-ece35a882489')
  })
})
