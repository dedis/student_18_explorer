<template lang="html">
  <v-list class="spawn-instruction-list">
    <v-list-tile v-for="arg in args" :key="arg.name">
      <v-list-tile-content>
        <v-card-text>
          {{ arg.name }}
          <br>
          {{ arg.value  }}
        </v-card-text>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { formatArg } from '../utils'

export default {
  props: ['instruction', 'length'],
  computed: {
    args: function () {
      return this.instruction.spawn.args.map((arg) => {
        var contract = this.instruction.spawn.contractid
        console.log('formatting', arg)
        return {
          name: `Name: ${arg.name}`,
          value: formatArg(`${contract}.${arg.name}`, arg.value)
        }
      })
    }
  }
}
</script>

<style>
.spawn-instruction-list .v-list__tile {
  height: auto;
}
</style>
