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

export {
  toUUID
}
