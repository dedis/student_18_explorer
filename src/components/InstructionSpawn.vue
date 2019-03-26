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
import { Darc } from '@dedis/cothority/darc'
import { bytes2Hex } from '../utils'

export default {
  props: ['instruction', 'length'],
  computed: {
    args: function () {
      return this.instruction.spawn.args.map((arg) => {
        let value = arg.value
        if (arg.name === 'darc') {
          const darc = Darc.decode(value)
          value = `Description: ${darc.description.toString()} ${darc.rules.toString()}`
        } else {
          value = `Value: ${bytes2Hex(value)}`
        }

        return {
          name: `Name: ${arg.name}`,
          value
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
