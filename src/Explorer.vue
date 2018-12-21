<template lang="html">
  <v-content>
    <br>
    <router-view :key="JSON.stringify(blocks)" :blocks="blocks" :getBlockByIndex="getBlockByIndex" :getBlockByHash="getBlockByHash" :socket="socket"></router-view>
  </v-content>
</template>

<script>
import { misc } from '@dedis/cothority'
export default {
  props: ['socket'],
  data: function () {
    return {
      blocks: [],
      chosenSkipchain: this.$route.params.chain,
      getBlockByIndex: (i, shouldNotUpdateBlocks) => {
        return this.socket.send('GetSingleBlockByIndex', 'SkipBlock', { genesis: misc.hexToUint8Array(this.$route.params.chain), index: i })
          .then(skipblock => {
            if (!shouldNotUpdateBlocks) { this.blocks.splice(i, 1, { ...skipblock, loaded: true }) }
            return skipblock
          })
      },
      getBlockByHash: (hash, shouldNotUpdateBlocks) => {
        return this.socket.send('GetSingleBlock', 'SkipBlock', { id: misc.hexToUint8Array(hash) })
          .then(skipblock => {
            if (!shouldNotUpdateBlocks) { this.blocks.splice(skipblock.index, 1, { ...skipblock, loaded: true }) }
            return skipblock
          })
      }
    }
  },
  mounted: function () {
    /* the if case stands for when the component is mounted for the first time it might take chosenSkipchain
      as the empty string. So we want mounted to be called only when chosenSkipchain exists */
    if (!this.chosenSkipchain) return
    const getUpdateChain = () => {
      this.socket.send('GetUpdateChain', 'GetUpdateChainReply', { latestID: misc.hexToUint8Array(this.chosenSkipchain) })
        .then((data) => {
          /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax */
          const blocks = data.update.map(b => ({ ...b, loaded: true }))
          const allBlocks = new Array(blocks[blocks.length - 1].index + 1).fill({}).map((_, i) => {
            const b = blocks.find(block => block.index === i)
            return b || { loaded: false, index: i, height: 1 }
          })
          this.blocks = allBlocks
        }).catch(() => {
        })
    }
    getUpdateChain()
  }
}
</script>

<style lang="css">
</style>
