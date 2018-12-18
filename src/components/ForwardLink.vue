<template>
  <p>
    Level {{ forwardi }} link: {{ link.from.slice(0, 15) }}...
    <v-icon color="#2F52E0">arrow_forward</v-icon>
    <a @click="fetchBlock()">
      {{link.to}}
    </a>
  </p>
</template>

<script>
import { misc } from '@dedis/cothority'

export default {
  props: ['forwardLink', 'forwardi', 'getBlockByHash', 'block', 'chain'],
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
      this.getBlockByHash(this.link.to).then(i =>
        this.$router.push(`/${this.$route.params.chain}/blocks/${i}`)
      )
    }
  }
}
</script>
