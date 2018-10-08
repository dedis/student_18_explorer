<template>
  <v-container>
    <h1>Hello DEDIS</h1>
    <input v-model="address" placeholder="status.dedis.ch">
    <input type="number" v-model="port" placeholder="7771">
    <button v-on:click="sendMessage(address, port)">send</button>
    {{response}}
  </v-container>
</template>

<script>
import { net } from '@dedis/cothority'

export default {
  name: 'StatusChecker',
  data: () => ({
    address: 'dedis.nella.org',
    port: 6879,
    response: ''
  }),
  methods: {
    sendMessage: (address, port) => {
      const wsAddress = `ws://${address}:${port}`

      const socket = new net.Socket(wsAddress, 'Skipchain')

      // the name of the protobuf structure we are sending
      const sendingMessageName = "Status"
      // the name of the protobuf structure we expect to receive
      const expectedMessageName = "ID"

      socket.send(sendingMessageName, expectedMessageName, {})
        .then((data) => {
          // data is a JS object
          this.response = data.id
        }).catch(() =>  {
        })
    }
  }
}
</script>
