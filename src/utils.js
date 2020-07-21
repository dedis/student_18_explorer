import 'buffer'

import { Darc } from '@dedis/cothority/darc'
import { Roster } from '@dedis/cothority/network'
import { ChainConfig } from '@dedis/cothority/byzcoin'
import { ProjectData } from '@/proto'
import moment from 'moment'
import varint from 'varint'

const toUUID = hex => {
  return hex.slice(0, 8).concat('-').concat(
    hex.slice(8, 12)
  ).concat('-').concat(
    hex.slice(12, 16)
  ).concat('-').concat(
    hex.slice(16, 20)
  ).concat('-').concat(
    hex.slice(20, 32)
  )
}

function bytes2Hex (bytes) {
  if (!bytes) {
    return ''
  }

  return Array.prototype.map.call(bytes, x => ('00' + x.toString(16)).slice(-2)).join('')
}

function hex2Bytes (hex) {
  if (!hex) {
    return Buffer.allocUnsafe(0)
  }

  return Buffer.from(hex, 'hex')
}

function formatArg (name, value) {
  try {
    if (name === 'config.darc' || name === 'darc.darc' || name === 'evolve_unrestricted.darc') {
      const darc = Darc.decode(value)
      return `DARC: ${darc.description.toString()}, rules: ${darc.rules.toString()}`
    }

    if (name === 'config.roster') {
      const r = Roster.decode(value)
      return r.list.map(x => `${x.description} ~ ${x.getWebSocketAddress()}`).join(', ')
    }

    if (name === 'config.block_interval') {
      const i = varint.decode(value)
      return `Value: ${moment.duration(i / 1000000).seconds()} seconds`
    }

    if (name === 'config.max_block_size') {
      const i = varint.decode(value)
      return `Value: ${i} bytes`
    }
    if (name === 'update_config.config') {
      const c = ChainConfig.decode(value)
      console.log('chainconfig', c)
      return `Value: ${c.toString()}`
    }
    if (name === 'setReady.enclaveURL') {
      const url = new TextDecoder('utf-8').decode(value)
      return `Value: ${url}`
    }
    if (name === 'update.projectData' || name === 'odysseyproject.projectData') {
      const data = JSON.stringify(ProjectData.decode(value))
      return `Value: ${data}`
    }
  } catch (e) {
    // If we fail to format specially, then do nothing; fall thru to default format.
    console.log('failed to format value', value, 'err', e)
    return `Value: ${bytes2Hex(value)}`
  }

  // default formatting: hex
  return `Value: ${bytes2Hex(value)}`
}

export {
  toUUID,
  bytes2Hex,
  hex2Bytes,
  formatArg
}
