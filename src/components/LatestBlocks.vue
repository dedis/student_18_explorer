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
      <td>{{ props.item.index }}</td>
      <td class="text-xs-left">{{ props.item.transactionNumber }}</td>
      <td class="text-xs-left">{{ props.item.verifiers.length }}</td>
      <td class="text-xs-left">{{ props.item.height }}</td>


    </template>

  </v-data-table>

  <h1>Block #blockId</h1>
</v-container>
</template>

<script>
  import identity, { net, misc } from '@dedis/cothority'

  export default {
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
        blocks: []
      }
    },
    mounted: function () {
      const socket = new net.RosterSocket(identity.Roster.fromTOML(`
        [[servers]]
          Address = "tls://localhost:7002"
          Suite = "Ed25519"
          Public = "57f43d164f82437064a59a02081984974deb821659e03262a67c190f6767e705"
          Description = "Conode_1"
        [[servers]]
          Address = "tls://localhost:7004"
          Suite = "Ed25519"
          Public = "40f3a1e76e8bc0bf0f0aad7e963e72c635c0d5e7f9b21e484714d1e8541b22db"
          Description = "Conode_2"
        [[servers]]
          Address = "tls://localhost:7006"
          Suite = "Ed25519"
          Public = "b21216372ea04f3c7d25e9386f94d58a564266ff7bd85d7acf79385e076e5f39"
          Description = "Conode_3"
      `), 'Skipchain')
      // 3013bfed8292c7e34d4845271d1486d17fa2863eedcd7c056f85d70a3076cb27
      // aa9bbaad83c999a348a9977afcfc0acfc677c26adc669c8accd41c0083c7a9ea
      socket.send('GetUpdateChain', 'GetUpdateChainReply', { latestID: misc.hexToUint8Array('aa9bbaad83c999a348a9977afcfc0acfc677c26adc669c8accd41c0083c7a9ea') })
        .then((data) => {
          // data is a JS object
          this.blocks = data.update
        }).catch(() => {
        })
    }
  }
</script>
