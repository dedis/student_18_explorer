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
      if (uuid === 'a7f6cdb7-47f8-56b4-aff5-ece35a882489') return 'Base Verifier'
      if (uuid === '14b74055-89f3-5031-aa63-a2839dbfdbdd') return 'Byzcoin Verifier'
      if (uuid === 'f7b6750d-188d-5f48-93a9-d8fba9cc262d') return 'Evoting Verifier'
      else return 'Unknown Verifier'
    }
  }
}
</script>
