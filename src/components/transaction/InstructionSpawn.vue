<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content>
      <template slot="header">
        <div>
          <strong>Spawn {{ instruction.spawn.contractid }} {{ instruction.instanceid }}</strong>
        </div>
      </template>

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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { formatArg } from '../../utils'

export default {
  props: ['instruction'],
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
