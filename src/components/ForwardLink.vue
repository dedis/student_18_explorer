<template>
  <p>
    0x{{link.from}}
    <v-icon color="#2F52E0">arrow_forward</v-icon>
    <router-link :to="'/blocks/0x' + link.to">
      0x{{link.to}}
    </router-link>
  </p>
</template>

<script>
import { misc } from '@dedis/cothority'

export default {
  props: ['forwardLink'],
  computed: {
    link: function () {
      const link = {
        from: misc.uint8ArrayToHex(this.forwardLink.from),
        to: misc.uint8ArrayToHex(this.forwardLink.to)
      }
      return link
    }
  }
}
</script>
