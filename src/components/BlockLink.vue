<template>
<div class="">
  Level {{hashi}} link: {{ block.slice(0, 15) }}...
  <v-icon color="green"> arrow_forward </v-icon>
  <router-link v-on:click.native="fetchBlock" :to="'/blocks/' + hash">{{hash}}</router-link>
</div>
</template>



<script>
export default {
  props: ['block', 'hash', 'hashi', 'getBlockByIndex', 'blockIndex'],
  methods: {
    fetchBlock: function () {
      if (this.blockIndex > 0) {
        this.getBlockByIndex(this.blockIndex - 1)
      }
    }
  }
}
</script>
