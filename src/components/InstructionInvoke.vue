<template>
  <v-list class="invoke-instruction-list">
    <v-list-tile v-for="arg in instruction.invoke.args" :key="arg.name">
      <v-list-tile-content>
        <v-card-text>
          Name: {{ arg.name }}
          <br>
          Value: {{ arg.value }}
        </v-card-text>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: ['instruction', 'length']
}
</script>

<style>
.invoke-instruction-list .v-list__tile {
  height: auto;
}
</style>
