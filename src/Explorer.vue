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
    const getNextBlockRecur = index => {
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
    getNextBlockRecur(0)
  }
}
</script>

<style lang="css">
</style>
