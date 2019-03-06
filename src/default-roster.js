export default `
[[servers]]
  Address = "tls://128.179.33.44:7000"
  Suite = "Ed25519"
  Public = "ec5c65a3c922d1df32075640e3de606197be24af76059a2ef145501122884bd3"
  Description = "EPFL Cothority-server"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "6f69dc10dbef8f4d80072aa9d1bee191b0f68b137a9d06d006c39fe6667738fa2d3439caf428a1dcb6f4a5bd2ce6ff6f1462ebb1b7374080d95310bc6e1115e105d7ae38f9fed1585094b0cb13dc3a0f3e74daeaa794ca10058e44ef339055510f4d12a7234779f8db2e093dd8a14a03440a7d5a8ef04cac8fd735f20440b589"
      Suite = "bn256.adapter"
    [servers.Services.PoPServer]
      Public = "8f3d081c68394ffa6b6049da3f65ff996549ae4ccf9584a5a0b0ad6b7d6263265b39d9c044b2a58038670d6a8efe57dcc99a0ab7cbbd91dc08febacd4a1ee548142438b5eedca67789ba0bb664b02beea62cf40cde2d2a2f3794e9b3afdbacb322090b653b723ee59ae2d8b6db7281c32f764bc4250d160caab058057e25fa8a"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "32ba0cccec06ac4259b39102dcba13677eb385e0fdce99c93406542c5cbed3ec6ac71a81b01207451346402542923449ecf71fc0d69b1d019df34407b532fb2a09005c801e359afb377cc3255e918a096912bf6f7b7e4040532404996e05f78c408760b57fcf9e04c50eb7bc413438aca9d653dd0b6a8353d128370ebd4bdb10"
      Suite = "bn256.adapter"
    [servers.Services.blsCoSiService]
      Public = "6a62b35ee5ec659625bdcc69b47e14a5b5aad9a0aacb8c6ac1fa301667471be915da15f6fefa2537ee5cc8fdad0d31de01f3f7ab4dda80aa104215f1ee85f1e255cd767d8f353fd5f89815b18a8f0e96e08532a131f221e87d3e19eb07f0e27b55b03977579a30f8ce4aad04449f2ec405c4070cf37786de8322e8109d52b891"
      Suite = "bn256.adapter"
`

// for skipchain testing:
/* `
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
*/
