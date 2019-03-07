<template>
  <StatusTable v-if="rpc && roster" :rpc="rpc" :roster="roster" />
</template>

<script>
import { status } from '@dedis/cothority'
import StatusTable from './status/StatusTable'

export default {
  props: ['blocks'],
  components: {
    StatusTable
  },
  data () {
    return {
      rpc: null,
      roster: null
    }
  },
  mounted () {
    const last = this.blocks.slice().pop()
    if (!last || !last.roster) {
      return
    }

    this.rpc = new status.StatusRPC(last.roster)
    this.roster = last.roster
  }
}
</script>
