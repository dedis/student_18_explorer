<template lang="html">
  <v-content v-if="loaded">
    <br>
    <router-view :key="JSON.stringify(blocks)" :blocks="blocks" :getBlockByIndex="getBlockByIndex" :getBlockByHash="getBlockByHash" :socket="socket"></router-view>
  </v-content>
</template>

<script>
import { hex2Bytes } from './utils'
import { SkipchainRPC } from '@dedis/cothority/skipchain'

export default {
  props: ['socket'],
  data: function () {
    return {
      loaded: false,
      blocks: [],
      chosenSkipchain: this.$route.params.chain,
      getBlockRoster: (index) => {
        const target = this.blocks[index]

        for (let i = index - 1; i >= 0; i--) {
          const block = this.blocks[i]

          if (block.loaded) {
            for (let k = 0; k < block.forward.length; k++) {
              const fl = block.forward[k]
              if (target.hash && fl.to.equals(target.hash) && fl.newRoster) {
                return fl.newRoster
              }
            }

            return block.roster
          }
        }

        return this.blocks[0].roster
      },
      getBlockByIndex: (i, shouldNotUpdateBlocks) => {
        const idx = this.blocks.findIndex(b => b.index === i)
        // get the most updated roster
        const socket = new SkipchainRPC(this.getBlockRoster(idx))

        return socket.getSkipBlockByIndex(hex2Bytes(this.$route.params.chain), i).then((reply) => {
          const { skipblock } = reply

          if (!shouldNotUpdateBlocks) {
            this.blocks.splice(i, 1, { ...skipblock, loaded: true })
          }

          return new Promise(function (resolve) {
            resolve(skipblock)
          })
        })
      },
      getBlockByHash: (hex, shouldNotUpdateBlocks) => {
        const hash = hex2Bytes(hex)
        const idx = this.blocks.findIndex(b => b.hash && b.hash.equals(hash))
        // get the most updated roster
        const socket = new SkipchainRPC(this.getBlockRoster(idx))

        return socket.getSkipBlock(hash).then((block) => {
          if (!shouldNotUpdateBlocks) {
            this.blocks.splice(block.index, 1, { ...block, loaded: true })
          }
          return block
        })
      }
    }
  },
  mounted: function () {
    /* the if case stands for when the component is mounted for the first time it might take chosenSkipchain
      as the empty string. So we want mounted to be called only when chosenSkipchain exists */
    if (!this.chosenSkipchain) return

    this.socket.getUpdateChain(hex2Bytes(this.chosenSkipchain), false).then(
      (blocks) => {
        this.blocks = new Array(blocks[blocks.length - 1].index + 1).fill({}).map((_, i) => {
          if (blocks.length > 0 && blocks[0].index === i) {
            return { loaded: true, ...blocks.shift() }
          }

          return { loaded: false, index: i, height: 1 }
        })

        this.loaded = true
      },
      (e) => {
        console.error(e)
        // TODO: do something with the error
      }
    )
  }
}
</script>

<style lang="css">
</style>
