<template>
  <v-container>

    <h1>Block {{$route.params.index}}</h1>

    {{/* find the element that has the same index and iterate over it to display its content */}}
    <div grid-list-md text-xs-center>
        <v-layout row wrap v-for="field in fields.filter(x => x.grid)/*.filter(e => typeof(e[1]) === 'number')*/">
          <v-flex xs4>
            <v-card-text class="px-0">{{field.show}}</v-card-text>
          </v-flex>
          <v-flex xs8>
            <v-card-text class="px-0">
              <span v-if="field.display === 'hash'">
                0x{{misc.uint8ArrayToHex(block[field.name])}}
              </span>
              <span v-else>
                {{block[field.name]}}
              </span>
            </v-card-text>
          </v-flex>
        </v-layout>
      </div>


    <v-expansion-panel
      expand
    >
      <v-expansion-panel-content
        v-for="field in fields.filter(x => !x.grid)"
      >
        <div slot="header">{{field.show}}</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            {{block[field.name]}}
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
  import { misc } from '@dedis/cothority'

  export default {
    props: ['blocks'],
    data: function () {
      return {
        fields: [
          {name: 'index', show: 'Index', display: 'number', grid: true},
          {name: 'height', show: 'Height',display: 'number', grid: true},
          {name: 'maxHeight', show: 'Max height',display: 'number', grid: true},
          {name: 'baseHeight', show: 'Base height',display: 'number', grid: true},
          {name: 'hash', show: 'Hash',display: 'hash', grid: true},
          {name: 'payload', show: 'Payload',display: ''},
          {name: 'parent', show: 'Parent',display: 'hash', grid: true},
          {name: 'genesis', show: 'Genesis block',display: 'hash', grid: true},
          {name: 'data', show: 'Data',display: 'hash', grid: true},
          {name: 'backlinks', show: 'Backward links',display: 'array'},
          {name: 'forward', show: 'Forward links',display: 'forward'},
          {name: 'verifiers', show: 'Verifiers',display: 'array'},
          {name: 'roster', show: 'Roster',display: 'roster'}
        ],
        misc: misc
      }
    },
    computed: {
      block: function () { return this.blocks.find(({ index }) => index === Number(this.$route.params.index)) }
    }
  }


</script>
