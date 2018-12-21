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
import { protobuf, misc } from '@dedis/cothority'

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
    const headerLookup = protobuf.root.lookup('DataHeader')
    const header = headerLookup.decode(this.block.data)

    this.header = {
      clienttransactionhash: misc.uint8ArrayToHex(header.clienttransactionhash),
      statechangehash: misc.uint8ArrayToHex(header.statechangeshash),
      trieroot: misc.uint8ArrayToHex(header.trieroot),
      timestamp: new Date(parseInt(header.timestamp / 1000000))
    }
  }
}
</script>

<style lang="css">
</style>
