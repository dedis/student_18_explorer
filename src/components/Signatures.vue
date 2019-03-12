<template>
  <v-navigation-drawer width="100%">
        <v-list>
          <v-list-group
            v-for="instruction in instructions"
            :key="instruction.index"
          >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>Signatures ({{instruction.signatures.length}})</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="s in instruction.signatures" :key="s.signer">
            <v-card-text>
              Signer: {{ s.signer }}
            </v-card-text>
          </v-list-tile>

    </v-list-group>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['instructions']
}
</script>
