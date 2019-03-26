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

  <!-- When we have payload with INVOKE-->
  <v-container v-else-if="invokeExists" xs12>
    <v-card
      v-for="(tx, txi) in body"
      :key="txi"
      color="#D4916A">

      <AcceptedChip :tx="tx" :txi="txi" :spawnExists="spawnExists" />

      <v-expansion-panel>
        <v-expansion-panel-content v-for="inst in tx.instructions" :key="inst.index">
          <template slot="header">
            <div><strong>Command {{ inst.index + 1}}/{{ tx.instructions.length }}: {{ inst.invoke.command }}</strong></div>
          </template>

          <InstructionInvoke :instruction="inst"/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Signatures -->
      <Signatures :instructions="tx.instructions"/>
    </v-card>
  </v-container>

  <!-- When we have payload with SPAWN-->
  <v-container v-else-if="spawnExists" xs12>
    <v-card v-for="(tx, txi) in body" :key="txi" color="#D4916A">
      <AcceptedChip :tx="tx" :txi="txi" :spawnExists="spawnExists"/>

      <v-expansion-panel expand>
        <v-expansion-panel-content v-for="inst in tx.instructions" :key="inst.index">
          <template slot="header">
            <div><strong>{{ inst.spawn.contractid }} {{ inst.instanceid }}</strong></div>
          </template>

          <InstructionSpawn v-if="inst.spawn" :instruction="inst" :length="tx.instructions.length"/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <Signatures :instructions="tx.instructions"/>
    </v-card>
  </v-container>

</v-layout>

</template>
<script>
import { DataBody } from '@dedis/cothority/byzcoin/proto'
import { toUUID, bytes2Hex } from '../utils'
import Signatures from './Signatures'
import InstructionInvoke from './InstructionInvoke'
import InstructionSpawn from './InstructionSpawn'
import AcceptedChip from './AcceptedChip'
import dump from 'buffer-hexdump'

export default {
  props: ['block'],
  components: {
    'Signatures': Signatures,
    'InstructionSpawn': InstructionSpawn,
    'InstructionInvoke': InstructionInvoke,
    'AcceptedChip': AcceptedChip
  },
  data: function () {
    return {
      body: {},
      panel: [true, true, false],
      disabled: false,
      noPayload: false,
      invokeExists: false,
      spawnExists: false,
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
    } else if (!body.txresults[0].clienttransaction.instructions[0].invoke) {
      this.spawnExists = true
    } else {
      this.invokeExists = true
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
