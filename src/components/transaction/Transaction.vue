<template>
  <v-card color="#D4916A">
    <AcceptedChip :tx="tx" :txi="index" />

    <v-container v-for="inst in tx.instructions" :key="inst.index">
      <InstructionInvoke v-if="inst.invoke" :instruction="inst" :total="tx.instructions.length" />
      <InstructionSpawn v-else-if="inst.spawn" :instruction="inst" />
      <InstructionDelete v-if="inst.delete" :instruction="inst" />

      <!-- Signatures -->
      <Signatures :instruction="inst"/>
    </v-container>
  </v-card>
</template>

<script>
import Signatures from './Signatures'
import InstructionInvoke from './InstructionInvoke'
import InstructionSpawn from './InstructionSpawn'
import InstructionDelete from './InstructionDelete'
import AcceptedChip from './AcceptedChip'

export default {
  props: ['tx', 'index'],
  components: {
    'Signatures': Signatures,
    'InstructionSpawn': InstructionSpawn,
    'InstructionInvoke': InstructionInvoke,
    'InstructionDelete': InstructionDelete,
    'AcceptedChip': AcceptedChip
  }
}
</script>
