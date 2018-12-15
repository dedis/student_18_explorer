<template>
  <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Time to fetch all blocks</div>
              <span class="grey--text">{{ blocks.length }} blocks</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat @click="timeToFetchAll">Compute</v-btn>
            <v-btn flat color="purple" @click="show=!show">What am I computing ?</v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">
              In this case, we are interested in seeing how much time it takes to fetch all blocks from the Skipchain {{this.$route.params.chain.slice(0, 15)}}...
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>

export default {
  props: ['blocks', 'getBlockByIndex', 'chosenSkipchain'],
  data: () => ({
    show: false
  }),
  methods: {
    timeToFetchAll: function () {
      console.log(this.blocks.length)
      console.log(this.$route.params.chain)
      var t0 = performance.now()
      this.blocks.filter(x => !x.loaded).forEach(({ index }) => this.getBlockByIndex(index))
      var t1 = performance.now()
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.')
    }
  }
}
</script>

<style lang="css">
</style>
