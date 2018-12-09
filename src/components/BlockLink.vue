<template>
<div class="">
  0x{{ block.slice(0, 15) }}...
  <v-icon color="green"> arrow_forward </v-icon>
  <router-link :to="'/blocks/0x' + hash">0x{{hash}}</router-link>
</div>
</template>



<script>
export default {
  props: ['block', 'hash']
}
</script>
