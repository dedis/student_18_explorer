<template>
    <v-container :class="className">
        <strong>{{ name }}</strong>
    </v-container>
</template>

<script>
export default {
  props: ['name', 'status'],
  computed: {
    className: function () {
      return `is-${this.status}`
    }
  }
}
</script>

<style>
.is-up {
    color: #52b452;
}

.is-down {
    color: #c25555;
}
</style>
