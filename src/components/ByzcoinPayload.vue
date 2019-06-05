<template>
<v-layout row>
  <!-- when we don't have any payload (genesis block for instance)-->
  <v-container v-if="noPayload">
    <v-alert :value="true" type="warning">
      No payload to display.
    </v-alert>
  </v-container>

  <v-container xs12>
    <v-container v-for="(tx, txi) in body" :key="txi">
      <Transaction :tx="tx" :index="txi" />
    </v-container>
  </v-container>
</v-layout>

</template>
<script>
import { DataBody } from '@dedis/cothority/byzcoin/proto'
import { toUUID, bytes2Hex } from '../utils'
import Transaction from './transaction/Transaction'
import dump from 'buffer-hexdump'

export default {
  props: ['block'],
  components: {
    'Transaction': Transaction
  },
  data: function () {
    return {
      body: {},
      panel: [true, true, false],
      disabled: false,
      noPayload: false,
      readonly: false,
      dump
    }
  },
  methods: {
    expo: function (x, f) {
      return Number.parseFloat(x).toExponential(f)
    }
  },
  mounted: function () {
    const body = DataBody.decode(this.block.payload)
    const decoder = new TextDecoder('utf-8')

    if (!body.txresults[0].clienttransaction.instructions[0].invoke && !body.txresults[0].clienttransaction.instructions[0].spawn) {
      this.noPayload = true
    }

    this.body = body.txresults.map(tx => ({
      accepted: tx.accepted,
      instructions: tx.clienttransaction.instructions.map((instr, idx) => ({
        index: idx,
        instanceid: parseInt(bytes2Hex(instr.instanceID)) >= 0 ? parseInt(bytes2Hex(instr.instanceID)) : bytes2Hex(instr.instanceID),
        signatures: instr.signatures.map((s, idx) => ({
          signature: toUUID(bytes2Hex(s)),
          signer: instr.signerIdentities[idx].toString()
        })),
        spawn: instr.spawn && {
          args: instr.spawn.args,
          contractid: instr.spawn.contractid
        },
        delete: instr.delete && {
          contractid: instr.delete.contractid
        },
        invoke: instr.invoke && {
          command: instr.invoke.command,
          args: instr.invoke.args.map(arg => ({
            name: arg.name,
            value: arg.value.constructor === Uint8Array
              ? (arg.value.length) > 15
                ? bytes2Hex(arg.value).slice(0, 15) + '...'
                : bytes2Hex(arg.value)
              : decoder.decode(arg.value)
          }))
        }
      }))
    }))
  }
}
</script>
<style media="screen">
  .nav-drawer {
    background-color: white;

  }
  .container {
    padding: 0px
  }
  .v-card__title {
    padding: 10px;
  }

</style>
