<template>
  <v-container>
    <v-expansion-panel
      v-model="panel"
      :disabled="disabled"
      :readonly="readonly"
      expand
    >
      <h3>Block {{$route.params.hash}}...</h3>

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
              <p v-else-if="field.display === 'hex'">
                <code>{{dump(block[field.name])}}</code>
                <br><br>
               <!-- <code>{{byzcoin}}</code> -->
              </p>
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
                <BlockLink :hash="misc.uint8ArrayToHex(hash)"/>
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
            <span v-else>
              {{block[field.name]}}
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
  import BlockLink from './BlockLink'
  import ForwardLink from './ForwardLink'
  import Roster from './Roster'

  export default {
    props: ['blocks'],
    components: {
      'BlockLink': BlockLink,
      'ForwardLink': ForwardLink,
      'Roster': Roster
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
          { name: 'payload', show: 'Payload', display: '' },
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
      block: function () { return this.blocks.length ? this.blocks.find(({ hash, loaded }) => (loaded && '0x' + misc.uint8ArrayToHex(hash)) === this.$route.params.hash) : {} }
    },
    methods: {
      toUUID: function (hex) {
        return hex.slice(0, 8).concat('-').concat(
          hex.slice(8, 12)
        ).concat('-').concat(
          hex.slice(12, 16)
        ).concat('-').concat(
          hex.slice(16, 20)
        ).concat('-').concat(
          hex.slice(20, 32)
        )
      }
    }
  }
</script>
<style>
.v-expansion-panel__container--disabled {
  color: black !important;
}
</style>
