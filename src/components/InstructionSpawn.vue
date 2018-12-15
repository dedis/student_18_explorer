<template lang="html">
<p>
  <v-list-tile
    v-if="instruction.spawn"
    v-for="arg in instruction.spawn.args"
    :key="arg.name"
    @click=""
    >
      <v-card-text class="scroll">
        Name: {{ arg.name }}
        <br>
        Value: {{ arg.value }}
        <br>
      </v-card-text>
    </v-list-tile>
  </p>
</template>

<script>
export default {
  props: ['instruction', 'length']
}
</script>

<style>
.scroll {
   overflow-y: auto;
 }
</style>
