<template>
  <v-app>
    <v-toolbar
    app
    extended
      :clipped-left="clipped"
    >
      <router-link :to="`/${$route.params.chain || ''}`" class="title-link">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <router-link :to="`/${$route.params.chain}/graph:`" class="title-link">
        <v-btn flat>Graph</v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <!--header -->
      <v-menu :nudge-width="100" slot="extension">
        <v-toolbar-title slot="activator">
          <span>Current Skipchain: {{chosenSkipchain && chosenSkipchain.slice(0,16)}}...</span>
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


    <Explorer v-if="socket" :socket="socket" :key="JSON.stringify(blocks)"/>


    <v-footer :fixed="fixed" app>
      <span style="padding-left: 1rem">&copy; DEDIS 2018 - Student Project</span>
      <span style="padding-left: 1rem">v.{{version}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import identity, { net, misc } from '@dedis/cothority'
import Explorer from './Explorer'
import UserRoster from './components/UserRoster'
import defaultRoster from './default-roster'
import { version } from '../package.json'
export default {
  name: 'App',
  components: { 'Explorer': Explorer, 'UserRoster': UserRoster },
  data () {
    return {
      version,
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
      chosenSkipchain: this.$route.params.chain
    }
  },
  /* -- my local roster, to be updated once we'll be dealing with DEDIS' skipchains */
  mounted: function () {
    this.connectToCothority(defaultRoster)
  },
  methods: {
    chooseSkipchain: function (e) {
      const v = e.target.innerText.slice(0, 64)
      this.$router.push(`/${v}`)
      this.chosenSkipchain = v
      this.connectToCothority(defaultRoster)
      this.$forceUpdate()
      // target.innerText is the parameter that displays the selected skipchain's hash
      // this.chosenSkipchain = e.target.innerText
    },

    connectToCothority: function (roster) {
      console.log(roster)
      const socket = new net.RosterSocket(identity.Roster.fromTOML(roster), 'Skipchain')
      /* get all skipchains IDs and map each of them to its hexadecimal form
         we define the first skipchain from the list as the one to be displayed, and the user can switch */
      socket.send('GetAllSkipChainIDs', 'GetAllSkipChainIDsReply', {})
        .then((data) => {
          this.skipchains = data.skipChainIDs.map(x => misc.uint8ArrayToHex(x))
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
