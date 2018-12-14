<template>
  <p>
    {{getType(uuid)}}: <code>{{uuid}}</code>
  </p>
</template>

<script>
export default {
  props: ['uuid'],
  methods: {
    getType: function (uuid) {
      if (uuid === '14b74055-89f3-5031-aa63-a2839dbfdbdd') return 'Byzcoin Verifier'
      else return 'Base Verifier'
    }
  }
}
</script>
