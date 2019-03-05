<template>
    <v-container>
        <h1>Status <small>{{items.length}}/{{maxNumServer}}</small></h1>

        <v-data-table :headers="headers" :items="items">
            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.lastUpdate }}</td>
                    <td>{{ props.item.host }}</td>
                    <td>{{ props.item.connectionType }}</td>
                    <td>{{ props.item.port }}</td>
                    <td>{{ props.item.uptime }}</td>
                    <td>{{ props.item.traffic }}</td>
                    <td>{{ props.item.services }}</td>
                    <td>{{ props.item.version }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { status } from '@dedis/cothority'

export default {
    props: ['blocks'],
    data: function() {
        return {
            items: [],
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Last Update', value: 'lastUpdate' },
                { text: 'Host', value: 'host' },
                { text: 'Connection Type', value: 'connectionType' },
                { text: 'Port', value: 'port' },
                { text: 'Uptime', value: 'uptime' },
                { text: 'Traffic', value: 'traffic' },
                { text: 'Services', value: 'services' },
                { text: 'Version', value: 'version' }
            ],
            fetchStatuses: async function() {
                const promises = []
                for (let i = 0; i < this.roster.length; i++) {
                    promises.push(this.rpc.getStatus(i))
                }

                const res = await Promise.all(promises);

                this.items = res.map(r => ({
                    name: r.serverIdentity.description,
                    version: r.status.Conode.field.version,
                    host: r.status.Generic.field.Host,
                    port: r.status.Generic.field.Port,
                    connectionType: r.status.Generic.field.ConnType,
                    uptime: r.status.Generic.field.Uptime,
                    traffic: r.status.Generic.field.RX_bytes,
                    services: r.status.Generic.field.Available_Services
                }));
            }
        }
    },
    computed: {
        maxNumServer: function () {
            return this.roster ? this.roster.length : 0
        }
    },
    mounted: function() {
        const last = this.blocks.slice().pop()
        if (!last) {
            return
        }

        this.roster = last.roster
        this.rpc = new status.StatusRPC(last.roster)

        this.fetchStatuses()
        setInterval(() => this.fetchStatuses(), 30 * 1000)
    }
}
</script>