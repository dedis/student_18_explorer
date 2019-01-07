<template>
<div v-if="blockIndex===0">
  <p>Note: The level 0 back link on block 0 is used as a nonce. It does not link to a real block.</p>
  Level {{hashi}} link: {{ block.slice(0, 15) }}...
  <v-icon color="green"> arrow_forward </v-icon>
  {{hash}}
</div>
<div v-else>
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
