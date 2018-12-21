<template>
<div class="">
  <p v-if="blockIndex === 0">This is a FAKE LINK</p>
  Level {{hashi}} link: {{ block.slice(0, 15) }}...
  <v-icon color="green"> arrow_forward </v-icon>
  <a @click="fetchBlock()">{{hash}}</a>
</div>
</template>



<script>
export default {
  props: ['block', 'hash', 'hashi', 'getBlockByHash', 'blockIndex', 'chain'],
  methods: {
    fetchBlock: function () {
      if (this.blockIndex > 0) {
        this.getBlockByHash(this.hash).then(({ index }) =>
          this.$router.push(`/${this.$route.params.chain}/blocks/${index}`)
        )
      }
    }
  }
}
</script>
