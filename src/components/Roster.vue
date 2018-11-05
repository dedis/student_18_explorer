<template>
  <!-- Special Roster case as it has many arguments -->
  <span>
    <p>Roster ID: {{id}}</p>
    <ul>
      <li v-for="ros in rost.list" :key="ros.id">
        Conode {{ros.id}} @ {{ros.address}} ~ {{ros.description}}
      </li>
    </ul>
  </span>
</template>

<script>
import { misc } from '@dedis/cothority'
export default {
  props: ['roster'],
  computed: {
    id: function () {
      return misc.uint8ArrayToHex(this.roster.id)
    },
    rost: function () {
      const rost = {
        id: misc.uint8ArrayToHex(this.roster.id),
        list: this.roster.list.map(({ id, signature, description, address }) => ({
          id: misc.uint8ArrayToHex(id),
          signature: signature,
          description: description,
          address: address
        }))
      }
      return rost
    }
  }
}
</script>
