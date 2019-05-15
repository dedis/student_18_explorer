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
      if (uuid === '1b4db7eb-4057-5ddf-91e0-36dec72071f5') return 'Evoting Verifier'
      else return 'Unknown Verifier'
    }
  }
}
</script>
