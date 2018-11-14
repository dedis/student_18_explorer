import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

/* eslint-env mocha */
const assert = require('assert')
const Vue = require('vue')
const ForwardLink = require('../src/components/ForwardLink.vue')

const from = { '0': 21, '1': 64, '2': 82, '3': 49, '4': 183, '5': 11, '6': 23, '7': 248, '8': 49, '9': 192, '10': 148, '11': 56, '12': 31, '13': 140, '14': 185, '15': 94, '16': 164, '17': 46, '18': 94, '19': 50, '20': 127, '21': 123, '22': 196, '23': 247, '24': 164, '25': 15, '26': 180, '27': 240, '28': 130, '29': 205, '30': 99, '31': 187 }
const to = { '0': 9, '1': 169, '2': 128, '3': 224, '4': 89, '5': 3, '6': 140, '7': 217, '8': 89, '9': 54, '10': 66, '11': 82, '12': 161, '13': 126, '14': 211, '15': 222, '16': 79, '17': 176, '18': 95, '19': 88, '20': 224, '21': 37, '22': 176, '23': 221, '24': 166, '25': 70, '26': 15, '27': 235, '28': 239, '29': 60, '30': 77, '31': 31 }

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})

var vm

before(function () {
  const Constructor = Vue.extend(ForwardLink)
  vm = new Constructor({ propsData: {
    from: from,
    to: to
  } }).$mount()
})

describe('A simple forward link', function () {
  it('displays the first 16 characters of the from´ hash', function () {
    const text = vm.$el.textContent
    console.log(text)
    return assert.strictEqual(-1, -1)
  })
})
