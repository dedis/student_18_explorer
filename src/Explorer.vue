<template lang="html">
  <v-content>
    <router-view :key="JSON.stringify(blocks)" v-bind:blocks="blocks" v-bind:getBlockByIndex="getBlockByIndex"></router-view>
  </v-content>
</template>

<script>
import { misc } from '@dedis/cothority'
export default {
  props: ['socket', 'chosenSkipchain'],
  data: function () {
    return {
      blocks: [],
      getBlockByIndex: i => {
        this.socket.send('GetSingleBlockByIndex', 'SkipBlock', { genesis: misc.hexToUint8Array(this.chosenSkipchain), index: i })
          .then(skipblock => {
            this.blocks.splice(i, 1, { ...skipblock, loaded: true })
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
          const allBlocks = new Array(blocks[blocks.length - 1].index+1).fill({}).map((_, i) => {
            const b = blocks.find(block => block.index === i)
            return b || { loaded: false, index: i, height: 1 }
          })
          this.blocks = allBlocks
        }).catch((err) => {
		  console.log(err)
        })
    }
    getUpdateChain()
    /* const getNextBlockRecur = index => {
      this.socket.send('GetSingleBlockByIndex', 'SkipBlock', { genesis: misc.hexToUint8Array(this.chosenSkipchain), index: index })
        .then((data) => {
          // data is a JS object
          this.blocks[index] = data.reply
          getNextBlockRecur(index + 1)
        }).catch((e) => {
          console.log(e)
        })
    }
    getNextBlockRecur(0) */
  }
}
</script>

<style lang="css">
</style>
