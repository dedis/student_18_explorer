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
      <td>{{ props.item.blockId }}</td>
      <td class="text-xs-left">{{ props.item.timeStamp }}</td>
      <td class="text-xs-left">{{ props.item.transactionNumber }}</td>
      <td class="text-xs-left">{{ props.item.cosi }}</td>
      <td class="text-xs-left">{{ props.item.height }}</td>
      <td class="text-xs-left">{{ props.item.index }}</td>


    </template>

  </v-data-table>

  <h1>Block #blockId</h1>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Block ID',
            align: 'left',
            sortable: false,
            value: 'blockId'
          },
          { text: 'Timestamp (date)', value: 'timeStamp' },
          { text: 'Transactions (nb)', value: 'transactionNumber' },
          { text: 'Collective Signing (nb)', value: 'cosi' },
          { text: 'Height (nb)', value: 'height' },
          { text: 'index (nb)', value: 'index' },

        ],
        blocks: [
          {
            value: false,
            blockId: 0,
            timeStamp: Date.now() - 100000,
            transactionNumber: 3,
            cosi: "dedis",
            height: 4,
            index: 0,
            merkleHash: 0,
            backwardsLinks: [],
            forwardLinks: []
          },
          {
            value: false,
            blockId: 1,
            timeStamp: Date.now() - 80000,
            transactionNumber: 3,
            cosi: "bsa",
            height: 3,
            index: 1,
            merkleHash: 0,
            backwardsLinks: [],
            forwardLinks: []
          },
          {
            value: false,
            blockId: 2,
            timeStamp: Date.now() - 78000,
            transactionNumber: 12,
            cosi: "dedis",
            height: 5,
            index: 2,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 3,
            timeStamp: Date.now() - 70000,
            transactionNumber: 4,
            cosi: "dedis",
            height: 2,
            index: 3,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 4,
            timeStamp: Date.now() - 60000,
            transactionNumber: 2,
            cosi: "dedis",
            height: 4,
            index: 4,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 5,
            timeStamp: Date.now() - 55000,
            transactionNumber: 0,
            cosi: "dedis",
            height: 7,
            index: 5,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 6,
            timeStamp: Date.now() - 30000,
            transactionNumber: 5,
            cosi: "dedis",
            height: 2,
            index: 6,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 7,
            timeStamp: Date.now() - 20000,
            transactionNumber: 3,
            cosi: "dedis",
            height: 5,
            index: 7,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 8,
            timeStamp: Date.now() -20000,
            transactionNumber: 1,
            cosi: "dedis",
            height: 7,
            index: 8,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          },
          {
            value: false,
            blockId: 9,
            timeStamp: Date.now() - 15000,
            transactionNumber: 1,
            cosi: "dedis",
            height: 7,
            index: 9,
            merkleHash: 0,
            backwardsLinks: 0,
            forwardLinks: 0
          }
        ]
      }
    }
  }
</script>


<!--
<template>
  <v-data-table
   :headers="headers"
   :items="blocks"
   class="elevation-1"
 >
   <template slot="items" slot-scope="props">
     <td>{{ props.item.blockId }}</td>
     <td class="text-xs-right">{{ props.item.index }}</td>
     <td class="text-xs-right">{{ props.item.timeStamp }}</td>
     <td class="text-xs-right">{{ props.item.transactionNumber }}</td>
     <td class="text-xs-right">{{ props.item.cosi}}</td>
     <td class="text-xs-right">{{ props.item.height }}</td>
   </template>

   <template slot="footer">
     <td colspan="100%">
       <strong>This is an extra footer</strong>
     </td>
   </template>
 </v-data-table>
</template>




<script>
export default {
    data () {
      return {
        headers: [
          {
            text: 'Block ID',
            align: 'left',
            sortable: false,
            value: 'blockId'
          },
          { text: 'index', value: 'index' },
          { text: 'age', value: 'timeStamp' },
          { text: 'number of transactions', value: 'transactionNumber' },
          { text: 'collective signing', value: 'cosi' },
          { text: 'height', value: 'height' }
        ],
        blocks: [
          {
            value: false,
            blockId: 0,
            index: 0,
            height: 2,
            timeStamp: Date.now() - 100000,
            transactionNumber: 4,
            cosi: "dedis",
            merkleHash: e2040cd1baa8e1744c90a14685cc03af5b0c7e20eb63ad93d9c0b57ddeffc770,
            backwardsLinks: [],
            forwardLinks: []
          },
          {
            value: false,
            blockId: 1,
            index: 1,
            height: 2,
            timeStamp: Date.now() - 80000,
            transactionNumber: 3,
            cosi: "dedis",
            merkleHash: g8e1744c90a14685cc03af5b0c7e20eb63ad93d9c0b57ddeffc770,
            backwardsLinks: [],
            forwardLinks: []
          },
          {
            value: false,
            blockId: 2,
            index: 2,
            height: 2,
            timeStamp: Date.now() - 60000,
            transactionNumber: 5,
            cosi: "dedis",
            merkleHash: d1baa8e1744c90a14685cc03af5b0c7e20eb63ad93d9c0b57ddeffc770,
            backwardsLinks: [],
            forwardLinks: []
          },
          {
            value: false,
            blockId: 3,
            index: 3,
            height: 2,
            timeStamp: Date.now() - 50000,
            transactionNumber: 2,
            cosi: "dedis",
            merkleHash: c90a14685cc03af5b0c7e20eb63ad93d9c0b57ddeffc770,
            backwardsLinks: [],
            forwardLinks: []
          },
          {
            value: false,
            blockId: 4,
            index: 4,
            height: 2,
            timeStamp: Date.now() - 20000,
            transactionNumber: 1,
            cosi: "dedis",
            merkleHash: c7e20eb63ad93d9c0b57ddeffc770,
            backwardsLinks: [],
            forwardLinks: []
          }]

      }
    }
  }



</script> -->
