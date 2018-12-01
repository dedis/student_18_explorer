<template>
 <h1>{{ WAZAA }}</h1>
</template>
<script>
import { byzcoin } from '@dedis/cothority'
const { ByzCoinRPC } = byzcoin
export default {
  props: ['socket', 'blocks'],
  data: function () {
    return {
      rpc: {}
    }
  },
  mounted: async function() {
    this.rpc = await ByzCoinRPC.fromKnownConfiguration(this.socket, this.blocks[0].hash)
  }
}
</script>
