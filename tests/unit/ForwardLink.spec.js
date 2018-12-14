/* eslint-env mocha */
const assert = require('assert')
const Vue = require('./Vue')
const ForwardLink = require('../../src/components/ForwardLink.vue').default

const from = new Uint8Array(Object.values({ '0': 21, '1': 64, '2': 82, '3': 49, '4': 183, '5': 11, '6': 23, '7': 248, '8': 49, '9': 192, '10': 148, '11': 56, '12': 31, '13': 140, '14': 185, '15': 94, '16': 164, '17': 46, '18': 94, '19': 50, '20': 127, '21': 123, '22': 196, '23': 247, '24': 164, '25': 15, '26': 180, '27': 240, '28': 130, '29': 205, '30': 99, '31': 187 }))
const to = new Uint8Array(Object.values({ '0': 9, '1': 169, '2': 128, '3': 224, '4': 89, '5': 3, '6': 140, '7': 217, '8': 89, '9': 54, '10': 66, '11': 82, '12': 161, '13': 126, '14': 211, '15': 222, '16': 79, '17': 176, '18': 95, '19': 88, '20': 224, '21': 37, '22': 176, '23': 221, '24': 166, '25': 70, '26': 15, '27': 235, '28': 239, '29': 60, '30': 77, '31': 31 }))

var vm

// Mount the instance
before(function () {
  const Constructor = Vue.extend(ForwardLink)
  vm = new Constructor({
    propsData: {
      forwardLink: {
        from: from,
        to: to
      }
    }
  }).$mount()
})

// Inspect the render output
describe('A simple forward link', function () {
  it('displays the first 15 characters of the ´from´ hash', function () {
    const text = vm.$el.textContent
    assert.ok(text.includes('15405231b70b17f'))
  })

  it('displays the whole ´to´ hash', function () {
    const text = vm.$el.textContent
    assert.ok(text.includes('09a980e059038cd959364252a17ed3de4fb05f58e025b0dda6460febef3c4d1f'))
  })
})
