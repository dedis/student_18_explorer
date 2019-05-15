<template>
  <v-container>
    <v-expansion-panel
      v-if="block.hash"
      v-model="panel"
      :disabled="disabled"
      :readonly="readonly"
      expand
    >

      <h3 :key="windowSize()" v-if="windowSize()>872" class="block-info">
        <v-btn flat small @click="goToBlock(-1)"> <v-icon> arrow_back </v-icon> </v-btn>
          Block {{block.index}}, {{bytes2Hex(block.hash)}}
        <v-btn flat small @click="goToBlock(1)"> <v-icon> arrow_forward </v-icon> </v-btn>
        <p v-if="infos.next">{{ infos.next }}</p>
      </h3>
      <h3 v-else class="block-info">
        <v-btn flat small @click="goToBlock(-1)"> <v-icon> arrow_back </v-icon> </v-btn>
          Block {{block.index}}, {{bytes2Hex(block.hash).slice(0, 10)}}...
        <v-btn flat small @click="goToBlock(1)"> <v-icon> arrow_forward </v-icon> </v-btn>
        <p v-if="infos.next">{{ infos.next }}</p>
      </h3>
      <v-expansion-panel-content
        v-for="field in fields.filter(x => x.display_first)"
        v-bind:key="field.name"

      >
        <div slot="header">{{field.show}}</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <!-- enters the if only if block[field.name] is defined -->
            <span v-if="field.display === 'array' && block[field.name]">
              <p v-for="(hash, hashi) in block[field.name]" :key="JSON.stringify(hash)">
                <BackwardLink :blockIndex="block.index" :block="bytes2Hex(block.hash)" :hash="bytes2Hex(hash)" :hashi="hashi" :getBlockByHash="getBlockByHash" :chain="$route.params.chain"/>
              </p>
            </span>
            <span v-else-if="field.display === 'verifier' && block[field.name]">
              <p v-for="hash in block[field.name]" :key="JSON.stringify(hash)">
                <Verifier :uuid="toUUID(bytes2Hex(hash))" />
              </p>
            </span>
            <p v-else-if="field.display === 'payload'" :key="JSON.stringify(block.payload)">
              <v-container>
                <p v-if="isByzcoin"><ByzcoinPayload :block="block" /></p>
              </v-container>
            </p>
            <p v-else-if="field.display === 'hex'">
              <v-container>
                <p v-if="isByzcoin">
                  <ByzcoinData :block="block"/>
                </p>
                <p v-if="isEvoting">
                  <Evoting :block="block" :roster="block.roster"/>
                </p>
                <p v-else>
                  <code>{{String(dump(block[field.name]))}}</code>
                </p>
              </v-container>
            </p>
            <span v-else-if="field.display === 'forward' && block[field.name]">
              <p v-for="(forwardLink, forwardi) in block[field.name]" :key="JSON.stringify(forwardLink)">
                <ForwardLink :forwardLink="forwardLink" :forwardi="forwardi" :block="block" :getBlockByHash="getBlockByHash" :chain="$route.params.chain"/>
              </p>
            </span>
            <span v-else-if="field.display === 'roster' && block[field.name]">
              <Roster :toUUID="toUUID" :roster="block[field.name]"/>
            </span>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content disabled v-for="field in fields.filter(x => !x.display_first)" v-bind:key="field.name">
        <template slot="header">

          <v-layout row>
            <v-flex xs4>
              <p>{{field.show}}</p>
            </v-flex>
            <v-flex xs8>
              <p v-if="field.display === 'hash'">
                {{block[field.name] && bytes2Hex(block[field.name]).slice(0, 15)}}...
              </p>

              <p v-else>{{block[field.name]}}</p>
            </v-flex>
          </v-layout>
        </template>
      </v-expansion-panel-content>

    </v-expansion-panel>
  </v-container>

</template>

<script>
import dump from 'buffer-hexdump'
import { toUUID, bytes2Hex, hex2Bytes } from '../utils'
import BackwardLink from './BackwardLink'
import ForwardLink from './ForwardLink'
import Roster from './Roster'
import ByzcoinPayload from './ByzcoinPayload'
import ByzcoinData from './ByzcoinData'
import Evoting from './Evoting'
import Verifier from './Verifier'

export default {
  props: ['blocks', 'socket', 'getBlockByIndex', 'getBlockByHash'],
  components: {
    'BackwardLink': BackwardLink,
    'ForwardLink': ForwardLink,
    'Roster': Roster,
    'ByzcoinPayload': ByzcoinPayload,
    'ByzcoinData': ByzcoinData,
    'Evoting': Evoting,
    'Verifier': Verifier
  },
  data: function () {
    return {
      /* 'show' is the name to be displayed, 'display' is the format
        Forward links and the Roster are both special cases */
      fields: [
        { name: 'height', show: 'Height', display: 'number' },
        { name: 'maxHeight', show: 'Max height', display: 'number' },
        { name: 'baseHeight', show: 'Base height', display: 'number' },
        { name: 'backlinks', show: 'Backward links', display: 'array', display_first: true },
        { name: 'forward', show: 'Forward links', display: 'forward', display_first: true },
        { name: 'payload', show: 'Payload', display: 'payload', display_first: true },
        { name: 'data', show: 'Data', display: 'hex', display_first: true },
        { name: 'verifiers', show: 'Verifiers', display: 'verifier', display_first: true },
        { name: 'roster', show: 'Roster', display: 'roster', display_first: true }
      ],
      bytes2Hex,
      panel: [false, false, true, true],
      disabled: false,
      readonly: false,
      dump,
      infos: { next: '' }
    }
  },
  mounted: function () {
    if (!this.block || !this.block.loaded) {
      this.getBlockByIndex(parseInt(this.$route.params.blockIndex))
    }
  },
  computed: {
    // finds the corresponding block whose infos need to be displayed on the page according to the block hash showed in page link
    block: function () { return this.blocks.length ? this.blocks.find(({ index }) => (index === parseInt(this.$route.params.blockIndex))) : {} },
    isByzcoin: function () {
      return this.block.verifiers && this.block.verifiers.find(verifier => toUUID(bytes2Hex(verifier)) === '14b74055-89f3-5031-aa63-a2839dbfdbdd')
    },
    isEvoting: function () {
      return this.block.verifiers && this.block.verifiers.find(verifier => toUUID(bytes2Hex(verifier)) === '1b4db7eb-4057-5ddf-91e0-36dec72071f5')
    }
  },
  methods: {
    windowSize: function () {
      return window.innerWidth
    },
    toUUID,
    goToBlock: function (relativeIndex) {
      const i = parseInt(this.$route.params.blockIndex) + relativeIndex
      if (i < 0) return
      // In the case we want to fetch a block whose index is greater than the
      // current number of loaded block, we have to check if one or more blocks
      // have been added. To do so, we query the last stored block in the chain
      // and compare its hash with our last local stored block. If the hash
      // match, we can be sur that no new blocks were added. Otherwise we can
      // safely fetch the i+1 block.
      if (i > this.blocks.length - 1) {
        this.socket.getUpdateChain(hex2Bytes(this.block.hash), false).then(
          (blocks) => {
            if (blocks.length > 1) {
              // If getUpdateChain returned the next block, use it without another network access.
              if (blocks[1].index === i) {
                this.blocks.splice(i, 1, { ...blocks[1], loaded: true })
                this.$router.push(`/${this.$route.params.chain}/blocks/${i}`)
              } else {
                this.getBlockByIndex(i).then(() => {
                  this.$router.push(`/${this.$route.params.chain}/blocks/${i}`)
                })
              }
            } else {
              this.infos.next = 'No new blocks detected.'
              setTimeout(() => {
                this.infos.next = ''
              }, 2000)
            }
          },
          (e) => {
            console.error(e)
          }
        )
      } else {
        this.getBlockByIndex(i)
        this.$router.push(`/${this.$route.params.chain}/blocks/${i}`)
      }
    }
  }
}
</script>
<style>
.v-expansion-panel__container--disabled {
  color: black !important;
}
code::before {
  content: '';
}
h3.block-info {
  position: relative;
}
h3.block-info > p {
  font-size: 10px;
  position: absolute;
  top: -10px;
  right: 10px;
}

</style>
