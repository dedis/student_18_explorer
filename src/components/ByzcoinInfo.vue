<template>
<v-layout row>

  <!-- when we don't have any payload (genesis block for instance)-->
  <v-container v-if="noPayload">
    <v-alert
      :value="true"
      type="warning"
      >
        No payload to display.
    </v-alert>
  </v-container>
  <v-container v-else xs12>
    <v-card
      v-for="(tx, txi) in body"
      :key="txi"
      color="teal">
      <v-card-title primary-title> Transaction {{ txi }} </v-card-title>
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
            v-if="instruction.invoke"
            v-for="arg in instruction.invoke.args"
            :key="arg.name"
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

    </v-list-group>
  </v-list>
  </v-navigation-drawer>
</v-card>
</v-container>

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
      noPayload: false,
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
    console.log(body)
    console.log(this.noPayload)
    console.log('mama')

    /*  if( (body.txresults.find(tx => tx === undefined)) ||
        (body.txresults.find(tx => tx.clienttransaction.instructions.find(inst => inst.invoke === null))) ||
        (body.find(tx => tx.clienttransaction.instructions.find(inst => inst.invoke.args.find(arg => arg === undefined))))) {
      this.noPayload = true
    }else{ */
    if (!body.txresults[0].clienttransaction.instructions[0].invoke) {
      this.noPayload = true
      return
    }

    this.body = body.txresults.map(tx => ({
      accepted: tx.accepted,
      instructions: tx.clienttransaction.instructions.map(instr => ({
        index: instr.index,
        signatures: instr.signatures.map(s => toUUID(misc.uint8ArrayToHex(s.signature))),
        invoke: instr.invoke && {
          command: instr.invoke.command,
          args: instr.invoke.args.map(arg => ({
            name: arg.name,
            value: arg.name === 'coins'
              ? parseInt('0x' + misc.uint8ArrayToHex(arg.value))
              : arg.name === 'destination' || arg.name === 'darc'
                ? '0x' + misc.uint8ArrayToHex(arg.value).slice(0, 15) + '...'
                : arg.name === 'event'
                  ? arg.value.constructor === Uint8Array
                    ? '0x' + misc.uint8ArrayToHex(arg.value)
                    : decoder.decode(arg.value).slice(13)
                  : arg.value
          }))
        }
      }))
    }))
    // }
    console.log(this.noPayload)
  }
}
</script>
<style media="screen">
  .nav-drawer {
    background-color: white;

  }
</style>
