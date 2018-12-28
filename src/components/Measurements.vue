<template>
  <v-layout row>
      <v-flex xs12 sm8 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div :key="glob">
              <div class="headline">Time to fetch all blocks</div>
              <span class="grey--text">{{ blocks.length }} blocks</span>
              <p>Time to fetch every layer by hash: {{ layers.map(x => x /1000 + 's').join('  |  ') }}</p>
              <p>Time to get all blocks by index: {{ glob / 1000 }}s</p>
              <p>Time to traverse chain: {{ traversal / 1000 }}s</p>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat @click="timeToFetchAll">Compute</v-btn>
            <v-btn flat color="purple" @click="show=!show">What am I computing ?</v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">
              In this case, we are interested in seeing how much time it takes to fetch blocks from the following Skipchain: {{this.$route.params.chain.slice(0, 15)}}...
              <br>
              <strong>First</strong> we have the time it takes to traverse each layer of forward links starting at the genesis block {{this.$route.params.chain.slice(0, 15)}}... starting at the lowest level.
              The traversal is done with getBlockByHash
              <br>
              <strong>Then</strong> we download all blocks one by one starting at the genesis block via getBlockByIndex.
              <br>
              <strong>Finally</strong>, we traverse the chain, i.e get from the genesis block to the latest block, using the highest forward link layers as available.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import { misc } from '@dedis/cothority'
export default {
  props: ['blocks', 'getBlockByIndex', 'chosenSkipchain', 'getBlockByHash'],
  data: () => ({
    show: false,
    layers: [],
    glob: 0,
    traversal: 0
  }),
  methods: {
    async timeToFetchAll () {
      const l = this.blocks[0].forward.map(_ => 0)
      this.layers = l
      for (var j = 0; j < this.blocks[0].forward.length; j++) {
        const time = Date.now()
        const f = this.blocks[0].forward[j]
        const getBlockRecur = x => new Promise((resolve, reject) => {
          this.getBlockByHash(misc.uint8ArrayToHex(x.to), true).then(skipblock => {
            const next = skipblock.forward[j]
            if (next) getBlockRecur(next).then(resolve)
            else resolve()
          })
        })
        await getBlockRecur(f)
        l[j] = Date.now() - time
      }
      this.layers = l

      this.glob = 0
      const x = Date.now()
      for (var i = 0; i < this.blocks.length; i++) {
        await this.getBlockByIndex(i, true)
      }
      const glob = Date.now() - x
      this.glob = glob

      this.traversal = 0
      const trav = Date.now()
      var block = this.blocks[0]
      while (block.index < this.blocks.length - 1) {
        const forward = block.forward
        block = await this.getBlockByHash(misc.uint8ArrayToHex(forward[forward.length - 1].to), true)
      }
      this.traversal = Date.now() - trav
    }
  }
}
</script>
