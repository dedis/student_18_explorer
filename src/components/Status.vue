<template>
  <v-container>
    <h1>Status
      <small>{{maxNumServer}} servers</small>
    </h1>

    <v-data-table :headers="headers" :items="items">
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            <Name :name="props.item.name" :status="props.item.status"/>
          </td>
          <td>
            <LastUpdate :value="props.item.lastUpdate"/>
          </td>
          <td>{{ props.item.host }}</td>
          <td>{{ props.item.connectionType }}</td>
          <td>{{ props.item.port }}</td>
          <td>{{ props.item.uptime && props.item.uptime.humanize() }}</td>
          <td>
            <Traffic
              :tx="props.item.traffic_tx"
              :rx="props.item.traffic_rx"
              :uptime="props.item.uptime"
            />
          </td>
          <td class="td-services" :title="props.item.services">
            <span v-if="props.item.services">{{props.item.numServices}}</span>
          </td>
          <td>{{ props.item.version }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Moment from 'moment'
import { status } from '@dedis/cothority'
import LastUpdate from './status/LastUpdate'
import Traffic from './status/Traffic'
import Name from './status/Name'

/**
 * Build an ISO 8601 string and parse it
 * @param uptime Uptime string received from the server
 * @returns a moment object
 */
function parseUptime (uptime) {
  return Moment.duration(
    'P0Y0M0DT' + uptime.replace(/\.[0-9]+/, '').toUpperCase()
  )
}

export default {
  props: ['blocks'],
  components: {
    LastUpdate,
    Traffic,
    Name
  },
  data: function () {
    return {
      maxNumServer: 0,
      items: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Last Update', value: 'lastUpdate' },
        { text: 'Host', value: 'host' },
        { text: 'Connection Type', value: 'connectionType' },
        { text: 'Port', value: 'port' },
        { text: 'Uptime', value: 'uptime' },
        { text: 'Traffic Tx/Rx', value: 'traffic_tx' },
        { text: 'Services', value: 'services' },
        { text: 'Version', value: 'version' }
      ],
      updateStatus (index, res) {
        // keep old fields
        this.items.splice(index, 1, {
          ...this.items[index],
          ...res
        })
      },
      async fetchStatuses () {
        for (let i = 0; i < this.roster.length; i++) {
          this.rpc
            .getStatus(i)
            .then(
              res => {
                const generic = res.getStatus('Generic')
                const conode = res.getStatus('Conode')
                if (!generic || !conode) {
                  return {}
                }

                const srvs = generic.getValue('Available_Services') || ''

                return {
                  status: 'up',
                  lastUpdate: Date.now(),
                  name: res.serverIdentity.description,
                  version: conode.getValue('version'),
                  host: generic.getValue('Host'),
                  port: generic.getValue('Port'),
                  connectionType: generic.getValue('ConnType'),
                  uptime: parseUptime(generic.getValue('Uptime')),
                  traffic_tx: generic.getValue('TX_bytes'),
                  traffic_rx: generic.getValue('RX_bytes'),
                  services: srvs.replace(/,/g, ', '),
                  numServices: srvs.split(',').length
                }
              },
              e => {
                console.log(`Error when trying to fetch status: ${e}`)
                return {
                  // default values if the first update fails
                  lastUpdate: Date.now(),
                  name: this.roster.list[i].address,
                  ...this.items[i],
                  status: 'down'
                }
              }
            )
            .then(r => this.updateStatus(i, r))
        }
      }
    }
  },
  mounted () {
    const last = this.blocks.slice().pop()
    if (!last || !last.roster) {
      return
    }

    this.roster = last.roster
    this.items = last.roster.list.map(si => ({
      name: si.address,
      lastUpdate: Date.now()
    }))
    this.maxNumServer = this.roster.length
    this.rpc = new status.StatusRPC(last.roster)

    this.fetchStatuses()
    this.timer = setInterval(() => this.fetchStatuses(), 30 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style>
.td-services span {
  border-bottom: 1px dotted black;
  padding: 0 2px;
  cursor: help;
}
</style>
