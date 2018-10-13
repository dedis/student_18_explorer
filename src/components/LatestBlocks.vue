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
      <tr v-on:click="goToBlock(props.item.index)">
        <td>{{ props.item.index }}</td>
        <td class="text-xs-left">{{ props.item.transactionNumber }}</td>
        <td class="text-xs-left">{{ props.item.verifiers.length }}</td>
        <td class="text-xs-left">{{ props.item.height }}</td>
      </tr>
    </template>

  </v-data-table>

</v-container>
</template>

<script>
  export default {
    props: ['blocks'],
    data () {
      return {
        headers: [
          {
            text: 'Block Index',
            align: 'left',
            sortable: false,
            value: 'index'
          },
          { text: 'Transactions (nb)', value: 'transactionNumber' },
          { text: 'Collective Signing (nb)', value: 'verifiers.length' },
          { text: 'Height (nb)', value: 'height' }
        ],
      }
    },
    methods: {
      goToBlock: function (index) {
        this.$router.push(`/blocks/${index}`)

      }

    }
  }
</script>
