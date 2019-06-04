<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <template slot="header">
        <div>
          <strong>Delete {{ instruction.delete.contractid }} {{ instruction.instanceid }}</strong>
        </div>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  props: ['instruction']
}
</script>
