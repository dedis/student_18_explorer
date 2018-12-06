<template>
<v-layout row>
  <!-- when we don't have any payload (genesis block for instance)-->
  <div v-if="body[0] === undefined">
    No payload to display
  </div>
  
  <div v-else>
  <v-carousel
    delimiter-icon="stop">
  <v-carousel-item xs12
    v-for="(tx, txi) in body"
    >
      <v-toolbar color="teal">

        <v-toolbar-title primary-title> Transaction {{ txi }} </v-toolbar-title>

        <v-spacer></v-spacer>

      </v-toolbar>


<v-navigation-drawer width="100%">
        <v-list>
          <v-list-group
            v-for="instruction in tx.instructions"
            :key="instruction.index"
          >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>Command: {{ instruction.invoke.command }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-for="arg in instruction.invoke.args"
            :key="arg.value"
            @click=""
            >

              <v-card-text v-if="instruction.invoke.command === 'event'">
                Name: {{ arg.name }}
                <br>
                Value: This block was automatically created during the SkipChain's instantiation.
                <br>
              </v-card-text>
              <v-card-text v-else>
                Name: {{ arg.name }}
                <br>
                Value: {{ arg.value }}
                <br>
              </v-card-text>
            </v-list-tile>
            </v-card>

    </v-list-group>
  </v-list>
  </v-navigation-drawer>
</v-carousel-item>
</v-carousel>
</div>

</v-layout>

</template>
<script>
import { protobuf, misc } from '@dedis/cothority'
import { toUUID } from '../utils'
export default {
  props: ['block'],
  data: function () {
    return {
      body: {},
      panel: [true, true, false],
      disabled: false,
      readonly: false
    }
  },
  mounted: function () {
    const headerLookup = protobuf.root.lookup('DataHeader')
    const header = headerLookup.decode(this.block.data)

    const bodyLookup = protobuf.root.lookup('DataBody')
    const body = bodyLookup.decode(this.block.payload)

    console.log(body)

    this.header = {
      clienttransactionhash: misc.uint8ArrayToHex(header.clienttransactionhash),
      statechangehash: misc.uint8ArrayToHex(header.statechangeshash),
      trieroot: misc.uint8ArrayToHex(header.trieroot),
      timestamp: new Date(header.timestamp)
    }

    const decoder = new TextDecoder('utf-8')

    this.body = body.txresults.map(tx => ({
      accepted: tx.accepted,
      instructions: tx.clienttransaction.instructions.map(instr => ({
        index: instr.index,
        signatures: instr.signatures.map(s => toUUID(misc.uint8ArrayToHex(s.signature))),
        invoke: {
          command: instr.invoke.command,
          args: instr.invoke.args.map(arg => ({
            name: arg.name,
            value: decoder.decode(arg.value).slice(13)
          }))
        }
      }))
    }))

    console.log(this.body)
  }
}
</script>
<style media="screen">
  .nav-drawer {
    background-color: white;

  }
</style>
