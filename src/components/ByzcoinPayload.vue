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

  <v-navigation-drawer width="100%">
      <v-list>
        <v-list-group
          v-for="instruction in tx.instructions"
          :key="instruction.index"
        >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>
              Command {{ instruction.index + 1}}/{{ tx.instructions.length }}: {{ instruction.invoke.command }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <InstructionInvoke :instruction="instruction"/>

    </v-list-group>
  </v-list>
  </v-navigation-drawer>

<!-- Signatures -->
<Signatures :instructions="tx.instructions"/>
</v-card>
</v-container>


<!-- When we have payload with SPAWN-->

<v-container v-else-if="spawnExists" xs12>
  <v-card
    v-for="(tx, txi) in body"
    :key="txi"
    color="#D4916A">

      <AcceptedChip :tx="tx" :txi="txi" :spawnExists="spawnExists"/>

  <v-navigation-drawer width="100%">
    <v-list>
      <v-list-group
        v-for="instruction in tx.instructions"
        :key="instruction.index"
          >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ instruction.spawn.contractid }} {{ instruction.instanceid }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <InstructionSpawn :instruction="instruction" :length="tx.instructions.length"/>

    </v-list-group>
  </v-list>
  </v-navigation-drawer>

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
      instructions: tx.clienttransaction.instructions.map(instr => ({
        index: instr.index,
        instanceid: parseInt(bytes2Hex(instr.instanceID)) >= 0 ? parseInt(bytes2Hex(instr.instanceID)) : bytes2Hex(instr.instanceID),
        signatures: instr.signatures.map(s => ({
          signature: toUUID(bytes2Hex(s.signature)),
          signer: s.signer
        })
        ),
        spawn: instr.spawn && {
          args: instr.spawn.args.map(arg => ({
            name: arg.name,
            value: bytes2Hex(arg.value)
          })

          ),
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
