<template>
  <router-link :to="'/blocks/0x' + hash">0x{{hash.slice(0, 16)}}...</router-link>
</template>

<script>

export default {
  props: ['hash', 'index']

}
</script>
