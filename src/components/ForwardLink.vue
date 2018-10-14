<template>
  <router-link :to="'/blocks/0x' + link.to">0x{{link.from.slice(0, 16)}}... -> 0x{{link.to.slice(0, 16)}}...</router-link>
</template>





<script>
import { misc } from '@dedis/cothority'
export default {
  props: ['forwardLink'],
  computed: {
    link: function () {
      const link = {
        from: misc.uint8ArrayToHex(this.forwardLink.from),
        to: misc.uint8ArrayToHex(this.forwardLink.to),
        signature: misc.uint8ArrayToHex(this.forwardLink.signature.msg)
      }
      return link
    }
  }
}
</script>
