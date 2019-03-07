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
import { bytes2Hex } from '../utils'

export default {
  props: ['forwardLink', 'forwardi', 'getBlockByHash', 'block', 'chain'],
  computed: {
    link: function () {
      const link = {
        from: bytes2Hex(this.forwardLink.from),
        to: bytes2Hex(this.forwardLink.to)
      }
      return link
    }
  },
  methods: {
    fetchBlock: function () {
      this.getBlockByHash(this.forwardLink.to).then(({ index }) =>
        this.$router.push(`/${this.$route.params.chain}/blocks/${index}`)
      )
    }
  }
}
</script>
