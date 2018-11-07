<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <router-link to="/" class="title-link">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <router-link to="/blocks" class="title-link">
        <v-btn flat>Explorer</v-btn>
      </router-link>
      <router-link to="/graph" class="title-link">
        <v-btn flat>Graph</v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <!--header -->
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>Current Skipchain: 0x{{chosenSkipchain.slice(0, 16)}}...</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="skipchain in skipchains"
            :key="JSON.stringify(skipchain)"
            @click="chooseSkipchain"
          >
            <v-list-tile-title v-text="skipchain"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <UserRoster :connectToCothority="connectToCothority" />
    </v-toolbar>


    <Explorer v-if="socket" :socket="socket" :chosenSkipchain="chosenSkipchain" :key="Math.random()"/>

    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; DEDIS 2018 - Student Project</span>
    </v-footer>
  </v-app>
</template>

<script>
import identity, { net, misc } from '@dedis/cothority'
import Explorer from './Explorer'
import UserRoster from './components/UserRoster'
import defaultRoster from './default-roster'
export default {
  name: 'App',
  components: { 'Explorer': Explorer, 'UserRoster': UserRoster },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SkipChain Explorer',
      socket: null,
      blocks: [],
      skipchains: [],
      chosenSkipchain: ''
    }
  },
  /* -- my local roster, to be updated once we'll be dealing with DEDIS' skipchains */
  mounted: function () {
    this.connectToCothority(defaultRoster)
  },
  methods: {

    chooseSkipchain: function (e) {
      // target.innerText is the parameter that displays the selected skipchain's hash
      this.chosenSkipchain = e.target.innerText
    },

    connectToCothority: function (roster) {
      console.log(roster)
      const socket = new net.RosterSocket(identity.Roster.fromTOML(roster), 'Skipchain')
      /* get all skipchains IDs and map each of them to its hexadecimal form
         we define the first skipchain from the list as the one to be displayed, and the user can switch */
      socket.send('GetAllSkipChainIDs', 'GetAllSkipChainIDsReply', {})
        .then((data) => {
          this.skipchains = data.skipChainIDs.map(x => misc.uint8ArrayToHex(x))
          this.chosenSkipchain = this.skipchains[0]
        }).catch(() => {
        })
      this.socket = socket
    }
  }
}
</script>
<style>
  .title-link {
    text-decoration: none;
    color: black;
  }
</style>
