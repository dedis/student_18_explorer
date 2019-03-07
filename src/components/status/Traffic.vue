<template>
    <v-container>
        {{ trm }} / {{ rcvd }}
    </v-container>
</template>

<script>
const units = ['Bps', 'KBps', 'MBps']

function reduce (v) {
  let i = 0
  while (v > 1024 && i < units.length) {
    v /= 1024
    i++
  }

  return `${v.toFixed(2)}${units[i]}`
}

export default {
  props: ['rx', 'tx', 'uptime'],
  computed: {
    rcvd: function () {
      if (!this.uptime) {
        return 0
      }

      return reduce(this.rx / this.uptime.asSeconds())
    },
    trm: function () {
      if (!this.uptime) {
        return 0
      }

      return reduce(this.tx / this.uptime.asSeconds())
    }
  }
}
</script>
