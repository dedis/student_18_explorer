<template>
  <v-container>

  <h1>Latest Blocks
    <v-btn
    @click="dialog=true">
      Load all blocks
    </v-btn>

    <v-dialog
      @keydown.esc="dialog = false"
      v-model="dialog"
      max-width="290"
        >
  <v-card>
    <v-card-title class="headline">Are you sure?</v-card-title>

    <v-card-text>
      Before loading all blocks, be sure that your roster is sufficient enough to support these requests. Worst case scenario your Web Browser might go down.
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="green darken-1"
        flat="flat"
        @click="dialog=false; fetchAll()"
      >
        Agree
      </v-btn>

      <v-btn
        color="green darken-1"
        flat="flat"
        @click="dialog = false"
      >
        Disagree
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  </h1>



  <br>
  <v-data-table
    :headers="headers"
    :items="blocks.filter(x => x.loaded)"
    hide-actions
    class="elevation-1"
  >

    <template slot="items" slot-scope="props">
      <tr v-on:click="goToBlock(props.item.index)">
        <td>{{ props.item.index }}</td>
        <td class="text-xs-left">{{ bytes2Hex(props.item.hash).slice(0, 8) }}...</td>
        <td class="text-xs-left">{{ props.item.verifiers.length }}</td>
        <td class="text-xs-left">{{ props.item.height }}</td>
      </tr>
    </template>

  </v-data-table>

</v-container>
</template>

<script>
  import { bytes2Hex } from '../utils'

  export default {
    props: ['blocks', 'getBlockByIndex'],
    data () {
      return {
        dialog: false,
        headers: [
          {
            text: 'Block Index',
            align: 'left',
            sortable: true,
            value: 'index'
          },
          { text: 'Hash', value: 'hash' },
          { text: 'Collective Signing', value: 'verifiers.length' },
          { text: 'Height', value: 'height' }
        ],
        bytes2Hex
      }
    },
    methods: {
      goToBlock: function (index) {
        this.$router.push(`${this.$route.fullPath}/${index}`) /* To navigate to a different URL, use router.push. This method pushes a new entry into the history stack, so when the user clicks the browser back button they will be taken to the previous URL. */
      },
      fetchAll: function () {
        this.blocks.filter(x => !x.loaded).forEach(({ index }) => this.getBlockByIndex(index))
      }
    }

  }
</script>
