<template>
<v-list>
  <v-list-tile v-if="tx.user">
    <v-list-tile-content>
      <v-list-tile-title>From user: <a :href="userUrl">{{ tx.user }}</a></v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>

  <v-list-tile
    v-for="(elem, elemi) in output"
    :key="elemi"
    avatar
    >

    <v-list-tile-content>
      <v-list-tile-title>{{ elemi }}: {{ elem }}</v-list-tile-title>
    </v-list-tile-content>

  </v-list-tile>
</v-list>
</template>

<script>
import { Transaction } from '@/proto'
import moment from 'moment'
import kyber from '@dedis/kyber'
const curve = new kyber.curve.edwards25519.Curve()

function nodeidToNode (roster, nodeid) {
  return roster.list.find(x => x.id.equals(nodeid)).description
}

export default {
  computed: {
    userUrl () {
      return `https://people.epfl.ch/${this.tx.user}`
    }
  },
  props: ['block', 'roster'],
  data: function () {
    return {
      output: {},
      tx: {}
    }
  },
  mounted: function () {
    if (this.block.data.length === 0) {
      return
    }
    const tx = Transaction.decode(this.block.data)
    this.tx = tx
    console.log(tx)

    if (tx.election != null) {
      const e = tx.election
      this.output = {
        'block type': 'election configuration',
        'title': e.name.en,
        'subtitle': e.subtitle.en,
        'candidates': e.candidates,
        '# of voters in the voter list': e.users.length,
        'from': moment(e.start).format(),
        'to': moment(e.end).format()
      }
      return
    }

    if (tx.ballot != null) {
      const alpha = curve.point()
      alpha.unmarshalBinary(tx.ballot.alpha.subarray(8))
      const beta = curve.point()
      beta.unmarshalBinary(tx.ballot.beta.subarray(8))

      this.output = {
        'block type': 'encrypted ballot',
        'alpha': alpha.toString(),
        'beta': beta.toString()
      }
      return
    }

    if (tx.mix != null) {
      // user is set in mix, this might be a bug in the server, but whatever, it's meaningless, so don't show it.
      this.tx.user = null
      this.output = {
        'block type': 'verified shuffle',
        '# ballots shuffled': tx.mix.ballots.length,
        'shuffler': nodeidToNode(this.roster, tx.mix.nodeid)
      }
      return
    }

    if (tx.partial != null) {
      // user is set in partial, this might be a bug in the server, but whatever, it's meaningless, so don't show it.
      this.tx.user = null
      this.output = {
        'block type': 'partial decryption',
        '# ballots': tx.partial.points.length,
        'decrypter': nodeidToNode(this.roster, tx.partial.nodeid)
      }
      return
    }

    // Default case:
    this.output = {
      'block type': 'unknown'
    }
  }
}
</script>

<style lang="css">
</style>
