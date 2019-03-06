<template>
    <v-container>
        {{since.humanize()}}
    </v-container>
</template>

<script>
import Moment from 'moment'

export default {
  props: ['value'],
  data () {
    return {
      since: Moment.duration(Date.now() - this.value)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.since = Moment.duration(Date.now() - this.value)
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
