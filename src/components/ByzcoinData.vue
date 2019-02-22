<template>

  <v-list>
     <v-list-tile
       v-for="(elem, elemi) in header"
       :key="elemi"
       avatar
       @click=""
     >

       <v-list-tile-content>
         <v-list-tile-title>{{ elemi }}: {{ elem }}</v-list-tile-title>
       </v-list-tile-content>

     </v-list-tile>
   </v-list>

</template>

<script>
import { DataHeader } from '@dedis/cothority/byzcoin/proto'
import { bytes2Hex } from '../utils'

export default {
  props: ['block'],
  data: function () {
    return {
      header: {},
      body: {},
      panel: [true, true, false],
      disabled: false,
      noPayload: false,
      invokeExists: false,
      spawnExists: false,
      readonly: false
    }
  },
  mounted: function () {
    const header = DataHeader.decode(this.block.data)

    this.header = {
      clienttransactionhash: bytes2Hex(header.clientTransactionHash),
      statechangehash: bytes2Hex(header.stateChangeHash),
      trieroot: bytes2Hex(header.trieRoot),
      timestamp: new Date(parseInt(header.timestamp / 1000000))
    }
  }
}
</script>

<style lang="css">
</style>
