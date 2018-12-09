/* eslint-env mocha */
const assert = require('assert')
const Vue = require('./Vue')
const BlockLink = require('../../src/components/BlockLink.vue').default

const hash = '0x09a980e059038cd959364252a17ed3de4fb05f58e025b0dda6460febef3c4d1f'.slice(0, 15)

var vm

// Mount the instance
before(function () {
  const Constructor = Vue.extend(BlockLink)
  vm = new Constructor({
    propsData: {
      hash
    }
  }).$mount()
})

// Inspect the render output
describe('A simple block link', function () {
  it('displays the hash of the block', function () {
    const text = vm.$el.textContent
    assert.ok(text.includes('0x09a980e059038cd959364252a17ed3de4fb05f58e025b0dda6460febef3c4d1f'.slice(0, 15)))
  })
})
