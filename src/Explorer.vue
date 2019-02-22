<template lang="html">
  <v-content>
    <br>
    <router-view :key="JSON.stringify(blocks)" :blocks="blocks" :getBlockByIndex="getBlockByIndex" :getBlockByHash="getBlockByHash" :socket="socket"></router-view>
  </v-content>
</template>

<script>
import { hex2Bytes } from './utils'

export default {
  props: ['socket'],
  data: function () {
    return {
      blocks: [],
      chosenSkipchain: this.$route.params.chain,
      getBlockByIndex: (i, shouldNotUpdateBlocks) => {
        return this.socket.getSkipBlockByIndex(hex2Bytes(this.$route.params.chain), i).then((reply) => {
          const { skipblock } = reply

          if (!shouldNotUpdateBlocks) {
            this.blocks.splice(i, 1, { ...skipblock, loaded: true })
          }
          return skipblock
        })
      },
      getBlockByHash: (hash, shouldNotUpdateBlocks) => {
        return this.socket.getSkipBlock(hex2Bytes(hash)).then((block) => {
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

    this.socket.getUpdateChain(hex2Bytes(this.chosenSkipchain)).then(
      (blocks) => {
        this.blocks = new Array(blocks[blocks.length - 1].index + 1).fill({}).map((_, i) => {
          if (blocks.length > 0 && blocks[0].index === i) {
            return { loaded: true, ...blocks.shift() }
          }

          return { loaded: false, index: i, height: 1 }
        })
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
