<template>
 <h2> Payload to be displayed on ByzcoinInfo</h2>
</template>
<script>
import { byzcoin } from '@dedis/cothority'
export default {
  props: ['bzsocket', 'blocks'],
  data: function () {
    return {
      rpc: {}
    }
  },
  mounted: function () {
    new Promise((resolve, reject) => {
      try {
        resolve(byzcoin.ByzCoinRPC.fromKnownConfiguration(this.bzsocket, this.blocks[0].hash))
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
