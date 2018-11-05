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
export default {
  name: 'App',
  components: { 'Explorer': Explorer },
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
    const socket = new net.RosterSocket(identity.Roster.fromTOML(`
      [[servers]]
        Address = "tls://localhost:7002"
        Suite = "Ed25519"
        Public = "57f43d164f82437064a59a02081984974deb821659e03262a67c190f6767e705"
        Description = "Conode_1"
      [[servers]]
        Address = "tls://localhost:7004"
        Suite = "Ed25519"
        Public = "40f3a1e76e8bc0bf0f0aad7e963e72c635c0d5e7f9b21e484714d1e8541b22db"
        Description = "Conode_2"
      [[servers]]
        Address = "tls://localhost:7006"
        Suite = "Ed25519"
        Public = "b21216372ea04f3c7d25e9386f94d58a564266ff7bd85d7acf79385e076e5f39"
        Description = "Conode_3"
    `), 'Skipchain')
    /* get all skipchains IDs and map each of them to its hexadecimal form
       we define the first skipchain from the list as the one to be displayed, and the user can switch */
    socket.send('GetAllSkipChainIDs', 'GetAllSkipChainIDsReply', {})
      .then((data) => {
        this.skipchains = data.skipChainIDs.map(x => misc.uint8ArrayToHex(x))
        this.chosenSkipchain = this.skipchains[0]
      }).catch(() => {
      })
    this.socket = socket
  },
  methods: {
    chooseSkipchain: function (e) {
      // target.innerText is the parameter that displays the selected skipchain's hash
      this.chosenSkipchain = e.target.innerText
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
