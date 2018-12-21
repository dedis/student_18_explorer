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
          <v-list-tile
            v-if="instruction.signatures.length > 0"
            v-for="s in instruction.signatures"
            :key="JSON.stringify(s)"
            @click=""
            >
              <v-card-text v-if="s.signer.ed25519">
                Signature: {{ s.signature}}
                <br>
                Signer: ed25519
                <br>
              </v-card-text>
              <v-card-text v-else>
                Signature: {{ s.signature}}
                <br>
                Signer: No signer <!--{{ s.signer }}-->
                <br>
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
