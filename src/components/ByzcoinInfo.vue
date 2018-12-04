<template>
 <h2> Payload to be displayed on ByzcoinInfo</h2>
</template>
<script>
import { protobuf, misc } from '@dedis/cothority'
import { toUUID } from '../utils'
export default {
  props: ['block'],
  data: function () {
    return {
    }
  },
  mounted: function () {
    const headerLookup = protobuf.root.lookup("DataHeader")
    const header = headerLookup.decode(this.block.data)

    const bodyLookup = protobuf.root.lookup("DataBody")
    const body = bodyLookup.decode(this.block.payload)

    this.header = {
      clienttransactionhash: misc.uint8ArrayToHex(header.clienttransactionhash),
      statechangehash: misc.uint8ArrayToHex(header.statechangeshash),
      trieroot: misc.uint8ArrayToHex(header.trieroot),
      timestamp: new Date(header.timestamp)
    }

    const decoder = new TextDecoder("utf-8")

    this.body = body.txresults.map(tx => ({
      accepted: tx.accepted,
      instructions: tx.clienttransaction.instructions.map(instr => ({
        index: instr.index,
        signatures: instr.signatures.map(s => toUUID(misc.uint8ArrayToHex(s.signature))),
        invoke: {
          command: instr.invoke.command,
          args: instr.invoke.args.map(arg => ({
            name: arg.name,
            value: decoder.decode(arg.value).slice(13)
          }))
        }
      }))
    }))

    console.log(this.body)
    console.log(new TextDecoder("utf-8").decode(body.txresults[0].clienttransaction.instructions[0].invoke.args[0].value).slice(13))

  }
}
</script>
