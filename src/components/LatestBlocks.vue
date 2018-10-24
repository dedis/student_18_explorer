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
  import { misc } from '@jeannechaverot/cothority'
  export default {
    props: ['blocks'],
    data () {
      return {
        headers: [
          {
            text: 'Block Index',
            align: 'left',
            sortable: true,
            value: 'index'
          },
          { text: 'Hash', value: 'hash' },
          { text: 'Transactions', value: 'transactionNumber' },
          { text: 'Collective Signing', value: 'verifiers.length' },
          { text: 'Height', value: 'height' }
        ],
        misc: misc
      }
    },
    methods: {
      goToBlock: function (hash) {
        this.$router.push(`/blocks/${hash}`) /* To navigate to a different URL, use router.push. This method pushes a new entry into the history stack, so when the user clicks the browser back button they will be taken to the previous URL. */
      }

    }
  }
</script>
