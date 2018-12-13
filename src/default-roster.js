export default/* `
[[servers]]
  Address = "tls://gasser.blue:7002"
  Public = "036bf316e1ea6e7e99e0bb713419d16c0b6794bf9dc442cc4cf36c3f935e93cf"
  Description = "EPFL Cothority-server"
` */

// for skipchain testing:
`
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
`
