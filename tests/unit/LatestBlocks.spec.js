/* eslint-env mocha */
const assert = require('assert')
const Vue = require('./Vue')
const blocks = require('./blocks')
const LatestBlocks = require('../../src/components/LatestBlocks.vue').default

var vm
var text
// Mount the instance
before(function () {
  const Constructor = Vue.extend(LatestBlocks)
  vm = new Constructor({
    propsData: {
      blocks
    },
    props: ['blocks']
  }).$mount()
  text = vm.$el.textContent
})

describe('A simple explorer page with one block', function () {
  it('chooses the right index to display', function () {
    assert.ok(text.includes(blocks[0].index))
  })
  it('chooses the right hash to display', function () {
    assert.ok(text.includes('44a47649'))
  })
  it('chooses the right collective signing', function () {
    assert.ok(text.includes(blocks[0].verifiers.length))
  })
  it('chooses the right height to display', function () {
    assert.ok(text.includes(blocks[0].height))
  })
})
