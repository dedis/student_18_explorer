<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" @keydown.esc="dialog = false" max-width="600px">
      <v-btn slot="activator" color="#801515" dark>Roster</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Enter your Cothority Roster</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-textarea v-model="roster" label="roster.toml" color="#801515" outline></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#801515" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="#801515" flat @click.native="connect">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    roster: ''
  }),
  methods: {
    connect: function() {
      this.dialog = false
      this.connectToCothority(this.roster)
    }

  },
  props: ['connectToCothority']
}
</script>
