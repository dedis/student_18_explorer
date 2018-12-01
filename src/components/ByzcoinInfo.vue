<template>
 <h1>WAZAA</h1>
</template>
<script>
import { byzcoin } from '@dedis/cothority'
export default {
  props: ['socket', 'blocks'],
  data: function () {
    return {
      rpc: {}
    }
  },
  mounted: function () {
    new Promise((resolve, reject) => {
      try {
        resolve(byzcoin.ByzCoinRPC.fromKnownConfiguration(this.socket, this.blocks[0].hash))
      } catch (e) {
        reject(e)
      }
    }).then(function (rpc) {
      this.rpc = rpc
      console.log(rpc)
    }.bind(this))
  }
}
</script>
