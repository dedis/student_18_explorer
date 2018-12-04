<template>
  <v-container>
    <v-expansion-panel
      v-model="panel"
      :disabled="disabled"
      :readonly="readonly"
      expand
    >
      <h3>Block {{$route.params.hash.slice(0, 16)}}...</h3>

      <v-expansion-panel-content disabled v-for="field in fields.filter(x => x.display_first)" v-bind:key="field.name">
        <template slot="header">

          <v-layout row>
            <v-flex xs4>
              <p>{{field.show}}</p>
            </v-flex>
            <v-flex xs8>
              <p v-if="field.display === 'hash'">
                0x{{block[field.name] && misc.uint8ArrayToHex(block[field.name]).slice(0, 16)}}...
              </p>
              <p v-else-if="field.name === 'payload' && isByzcoin">
                <ByzcoinInfo :block="block" />
              </p>
              <code v-else-if="field.display === 'hex'">{{dump(block[field.name])}}</code>
              <p v-else>{{block[field.name]}}</p>
            </v-flex>
          </v-layout>
        </template>
      </v-expansion-panel-content>

      <v-expansion-panel-content
        v-for="field in fields.filter(x => !x.display_first)"
        v-bind:key="field.name"
      >
        <div slot="header">{{field.show}}</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <!-- enters the if only if block[field.name] is defined -->
            <span v-if="field.display === 'array' && block[field.name]">
              <p v-for="hash in block[field.name]" :key="JSON.stringify(hash)">
                <BlockLink :block="misc.uint8ArrayToHex(block.hash)" :hash="misc.uint8ArrayToHex(hash)"/>
              </p>
            </span>
            <span v-else-if="field.display === 'uuid' && block[field.name]">
              <p v-for="hash in block[field.name]" :key="JSON.stringify(hash)">
                <code>{{ toUUID(misc.uint8ArrayToHex(hash)) }}</code>
              </p>
            </span>
            <span v-else-if="field.display === 'forward' && block[field.name]">
              <p v-for="forwardLink in block[field.name]" :key="JSON.stringify(forwardLink)">
                <ForwardLink :forwardLink="forwardLink"/>
              </p>
            </span>
            <span v-else-if="field.display === 'roster' && block[field.name]">
              <Roster :toUUID="toUUID" :roster="block[field.name]"/>
            </span>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

    </v-expansion-panel>
  </v-container>

</template>

<script>
  import { misc } from '@dedis/cothority'
  import dump from 'buffer-hexdump'
  import { toUUID } from '../utils'
  import BlockLink from './BlockLink'
  import ForwardLink from './ForwardLink'
  import Roster from './Roster'
  import ByzcoinInfo from './ByzcoinInfo'

  export default {
    props: ['blocks', 'socket'],
    components: {
      'BlockLink': BlockLink,
      'ForwardLink': ForwardLink,
      'Roster': Roster,
      'ByzcoinInfo': ByzcoinInfo
    },
    data: function () {
      return {
        /* 'show' is the name to be displayed, 'display' is the format
        Forward links and the Roster are both special cases */
        fields: [
          { name: 'index', show: 'Index', display: 'number', display_first: true },
          { name: 'height', show: 'Height', display: 'number', display_first: true },
          { name: 'maxHeight', show: 'Max height', display: 'number', display_first: true },
          { name: 'baseHeight', show: 'Base height', display: 'number', display_first: true },
          { name: 'hash', show: 'Hash', display: 'hash', display_first: true },
          { name: 'payload', show: 'Payload', display: 'hex', display_first: true },
          { name: 'parent', show: 'Parent', display: 'hash', display_first: true },
          { name: 'genesis', show: 'Genesis block', display: 'hash', display_first: true },
          { name: 'data', show: 'Data', display: 'hex', display_first: true },
          { name: 'backlinks', show: 'Backward links', display: 'array' },
          { name: 'forward', show: 'Forward links', display: 'forward' },
          { name: 'verifiers', show: 'Verifiers', display: 'uuid' },
          { name: 'roster', show: 'Roster', display: 'roster' }
        ],
        misc: misc,
        panel: [true, true, false],
        disabled: false,
        readonly: false,
        dump
      }
    },
    computed: {
      block: function () { return this.blocks.length ? this.blocks.find(({ hash, loaded }) => (loaded && '0x' + misc.uint8ArrayToHex(hash)) === this.$route.params.hash) : {} },
      isByzcoin: function () { return true } // TO BE REPLACED WITH BYZCOIN CHECKER
    },
    methods: {
      toUUID
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
