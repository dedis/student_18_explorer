import 'buffer'

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

export {
  toUUID,
  bytes2Hex,
  hex2Bytes
}
