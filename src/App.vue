<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <router-link to="/" class="title-link">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>

    </v-toolbar>
    <v-content>
      <router-view v-bind:blocks="blocks"></router-view>
    </v-content>
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

export default {
  name: 'App',
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
      blocks: []
    }
  },
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
    // 3013bfed8292c7e34d4845271d1486d17fa2863eedcd7c056f85d70a3076cb27
    // aa9bbaad83c999a348a9977afcfc0acfc677c26adc669c8accd41c0083c7a9ea
    socket.send('GetUpdateChain', 'GetUpdateChainReply', { latestID: misc.hexToUint8Array('aa9bbaad83c999a348a9977afcfc0acfc677c26adc669c8accd41c0083c7a9ea') })
      .then((data) => {
        // data is a JS object
        this.blocks = data.update
      }).catch(() => {
      })
  }
}
</script>
<style>
  .title-link {
    text-decoration: none;
    color: black;
  }
</style>
