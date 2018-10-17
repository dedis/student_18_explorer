<template>
  <v-container>

  <h1>Available Skipchains</h1>
  <br>

</v-container>
</template>

<script>
  import { misc } from '@jeannechaverot/cothority'
  export default {
    props: ['skipchains'],
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
