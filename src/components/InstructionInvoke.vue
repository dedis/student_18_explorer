<template>
  <p>
    <v-list-tile
      v-if="instruction.invoke"
      v-for="arg in instruction.invoke.args"
      :key="arg.name"
      @click=""
      >
        <v-card-text>
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
