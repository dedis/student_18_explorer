<template>
  <!-- Special Roster case as it has many arguments -->
  <span>
    <p>Roster ID: <code>{{ toUUID(id) }}</code></p>
    <ul>
      <li v-for="ros in rost.list" :key="ros.id">
        Conode <code>{{ toUUID(ros.id) }}</code> @ {{ros.address}} ~ {{ros.description}} ~ {{ros.url}}
      </li>
    </ul>
  </span>
</template>

<script>
import { bytes2Hex } from '../utils'
export default {
  props: ['roster', 'toUUID'],
  computed: {
    id: function () {
      return bytes2Hex(this.roster.id)
    },
    rost: function () {
      const rost = {
        id: bytes2Hex(this.roster.id),
        list: this.roster.list.map(({ id, signature, description, address, url }) => ({
          id: bytes2Hex(id),
          signature: signature,
          description: description,
          address: address,
          url: url,
        }))
      }
      return rost
    }
  }
}
</script>
