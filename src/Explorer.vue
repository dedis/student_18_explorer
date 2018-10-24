<template lang="html">


  <v-content>
    <router-view v-bind:blocks="blocks"></router-view>
  </v-content>


</template>

<script>
import { misc } from '@jeannechaverot/cothority'

export default {
  props: ['socket', 'chosenSkipchain'],
  data: function () {
    return {
      blocks: []
    }
  },
  mounted: function () {
    /* the if case stands for when the component is mounted for the first time it might take chosenSkipchain
      as the empty string. So we want mounted to be called only when chosenSkipchain exists */
    if (!this.chosenSkipchain) return
    const getUpdateChain = () => {
      this.socket.send('GetUpdateChain', 'GetUpdateChainReply', { latestID: misc.hexToUint8Array(this.chosenSkipchain) })
        .then((data) => {
          this.blocks = data.update
        }).catch(() => {
        })
    }
    getUpdateChain()
    /* const getNextBlockRecur = index => {
      this.socket.send('GetSingleBlockByIndex', 'SkipBlock', { genesis: misc.hexToUint8Array(this.chosenSkipchain), index: index })
        .then((data) => {
          // data is a JS object
          console.log(data)
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
