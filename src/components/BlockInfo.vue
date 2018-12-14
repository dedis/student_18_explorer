<template>
  <v-container>
    <v-expansion-panel
      v-if="block.hash"
      v-model="panel"
      :disabled="disabled"
      :readonly="readonly"
      expand
    >

      <h3>
        <v-btn flat small @click="goToBlock(-1)"> <v-icon> arrow_back </v-icon> </v-btn>
          Block {{block.index}}, {{misc.uint8ArrayToHex(block.hash)}}
        <v-btn flat small @click="goToBlock(1)"> <v-icon> arrow_forward </v-icon> </v-btn>
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
                <BackwardLink :blockIndex="block.index" :block="misc.uint8ArrayToHex(block.hash)" :hash="misc.uint8ArrayToHex(hash)" :hashi="hashi" :getBlockByIndex="getBlockByIndex" :chain="$route.params.chain"/>
              </p>
            </span>
            <span v-else-if="field.display === 'verifier' && block[field.name]">
              <p v-for="hash in block[field.name]" :key="JSON.stringify(hash)">
                <Verifier :uuid="toUUID(misc.uint8ArrayToHex(hash))" />
              </p>
            </span>
            <p v-else-if="field.display === 'payload'">
              <v-container>
                <p v-if="isByzcoin"><ByzcoinPayload :block="block" /></p>
                <h2 v-else>
                  <v-alert
                      :value="true"
                      type="warning"
                      >
                        This is not a Byzcoin Block.
                    </v-alert></h2>
            </v-container>
            </p>
            <p v-else-if="field.display === 'hex'">
              <v-container>
                <p v-if="isByzcoin">
                  <ByzcoinData :block="block"/>
                </p>
                <p v-else>
                  <code> {{String(dump(block[field.name])).substr(51)}}</code>
                </p>
              </v-container>
            </p>
            <span v-else-if="field.display === 'forward' && block[field.name]">
              <p v-for="(forwardLink, forwardi) in block[field.name]" :key="JSON.stringify(forwardLink)">
                <ForwardLink :forwardLink="forwardLink" :forwardi="forwardi" :block="block" :getBlockByIndex="getBlockByIndex" :chain="$route.params.chain"/>
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
                {{block[field.name] && misc.uint8ArrayToHex(block[field.name]).slice(0, 15)}}...
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
  import { misc } from '@dedis/cothority'
  import dump from 'buffer-hexdump'
  import { toUUID } from '../utils'
  import BackwardLink from './BackwardLink'
  import ForwardLink from './ForwardLink'
  import Roster from './Roster'
  import ByzcoinPayload from './ByzcoinPayload'
  import ByzcoinData from './ByzcoinData'
  import Verifier from './Verifier'

  export default {
    props: ['blocks', 'socket', 'getBlockByIndex'],
    components: {
      'BackwardLink': BackwardLink,
      'ForwardLink': ForwardLink,
      'Roster': Roster,
      'ByzcoinPayload': ByzcoinPayload,
      'ByzcoinData': ByzcoinData,
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
        misc: misc,
        panel: [true, true, false],
        disabled: false,
        readonly: false,
        dump
      }
    },
    mounted: function () {
      this.getBlockByIndex(parseInt(this.$route.params.blockIndex))
    },
    computed: {
      // finds the corresponding block whose infos need to be displayed on the page according to the block hash showed in page link
      block: function () { return this.blocks.length ? this.blocks.find(({ index }) => (index === parseInt(this.$route.params.blockIndex))) : {} },
      isByzcoin: function () {
        return this.block.verifiers && this.block.verifiers.find(verifier => toUUID(misc.uint8ArrayToHex(verifier)) === '14b74055-89f3-5031-aa63-a2839dbfdbdd')
      }
    },
    methods: {
      toUUID,
      goToBlock: function (relativeIndex) {
        const i = parseInt(this.$route.params.blockIndex) + relativeIndex
        if (i < 0 || i > this.blocks.length - 1) return
        this.getBlockByIndex(i)
        this.$router.push(`/${this.$route.params.chain}/blocks/${i}`)
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
</style>
