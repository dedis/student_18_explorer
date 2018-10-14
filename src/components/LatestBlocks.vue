<template>
  <v-container>

  <h1>Latest Blocks</h1>
  <br>
  <v-data-table
    :headers="headers"
    :items="blocks"
    class="elevation-1"
  >

    <template slot="items" slot-scope="props">
      <tr v-on:click="goToBlock('0x' + misc.uint8ArrayToHex(props.item.hash))">
        <td>{{ props.item.index }}</td>
        <td class="text-xs-left">0x{{ misc.uint8ArrayToHex(props.item.hash).slice(0, 8) }}...</td>
        <td class="text-xs-left">{{ props.item.transactionNumber }}</td>
        <td class="text-xs-left">{{ props.item.verifiers.length }}</td>
        <td class="text-xs-left">{{ props.item.height }}</td>
      </tr>
    </template>

  </v-data-table>

</v-container>
</template>

<script>
  import { misc } from '@dedis/cothority'
  export default {
    props: ['blocks'],
    data () {
      return {
        headers: [
          {
            text: 'Block Index',
            align: 'left',
            value: 'index'
          },
          { text: 'Hash (nb)', value: 'hash' },
          { text: 'Transactions (nb)', value: 'transactionNumber' },
          { text: 'Collective Signing (nb)', value: 'verifiers.length' },
          { text: 'Height (nb)', value: 'height' }
        ],
        misc: misc
      }
    },
    methods: {
      goToBlock: function (hash) {
        this.$router.push(`/blocks/${hash}`)
      }

    }
  }
</script>
