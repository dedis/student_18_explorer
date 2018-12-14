<template>
  <p>
    Level {{forwardi}} link: {{ link.from.slice(0, 15) }}...
    <v-icon color="#2F52E0">arrow_forward</v-icon>
    <router-link v-on:click.native="fetchBlock" :to="`/${chain}/blocks/${block.index + 1}`">
      {{link.to}}
    </router-link>
  </p>
</template>

<script>
import { misc } from '@dedis/cothority'

export default {
  props: ['forwardLink', 'forwardi', 'getBlockByIndex', 'block', 'chain'],
  computed: {
    link: function () {
      const link = {
        from: misc.uint8ArrayToHex(this.forwardLink.from),
        to: misc.uint8ArrayToHex(this.forwardLink.to)
      }
      return link
    }
  },
  methods: {
    fetchBlock: function () {
      this.getBlockByIndex(this.block.index + 1)
    }
  }
}
</script>
