<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content v-for="instruction in instructions" :key="instruction.index">
      <template slot="header">
        <div><strong>Signatures ({{instruction.signatures.length}})</strong></div>
      </template>

      <v-list>
        <v-list-tile v-for="s in instruction.signatures" :key="s.signer">
          <v-list-tile-content>
            <v-card-text>
              Signer: {{ s.signer }}
            </v-card-text>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ['instructions']
}
</script>
