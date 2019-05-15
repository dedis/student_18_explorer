<template>
  <v-list class="invoke-instruction-list">
    <v-list-tile v-for="arg in args" :key="arg.name">
      <v-list-tile-content>
        <v-card-text>
          {{ arg.name }}
          <br>
          {{ arg.value }}
        </v-card-text>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { formatArg } from '../utils'

export default {
  props: ['instruction'],
  computed: {
    args: function () {
      return this.instruction.invoke.args.map((arg) => {
        // For invokes, we put the command before the arg name.
        console.log('formatting invoke', this.instruction.invoke)
        const uint = new Uint8Array(arg.value.length)
        for (var i = 0, j = arg.value.length; i < j; ++i) {
          uint[i] = arg.value.charCodeAt(i)
        }
        return {
          name: `Name: ${arg.name}`,
          value: formatArg(`${this.instruction.invoke.command}.${arg.name}`, uint)
        }
      })
    }
  }
}
</script>

<style>
.invoke-instruction-list .v-list__tile {
  height: auto;
}
</style>
