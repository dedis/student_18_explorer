export default `
[[servers]]
  Address = "tls://198.137.202.74:7770"
  Suite = "Ed25519"
  Public = "a86f3496bd78a741ebe27915b7d02c8a5a403d0baed32b1fec6da057aa56519d"
  Description = "jra@employees.org"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "891d8bea9a42060d886919e3c065c05d372c3c6d34e13395df0fe3ba6947fda30083b6be9f16b2920b4193f6186a400f4fcf9c396b4e9fbe3a76ce0c923a410e0302a0e4b2c00f700ce70f511c50a28128291508776c61f1c1c7b39eada39e94452cd53e903c27cfdb6e11569ac7f45bd7956e39ba7d6a278f6edf8ed41d470c"
      Suite = "bn256.adapter"
    [servers.Services.PoPServer]
      Public = "785419ea74fe57d39eeed741042694e9e8ac1ac32977d26604083410fe7721346261a4e62674f96e71fc45151e6b0bf4c9d7de19b116e55578b9607abbb47f8f3d179abd69500c8dc47ef1ed03f47298c4f5740a05de623c4acc153ed45a68ba8a47c77c121cebc216de1e55721662afcf2cbe00f150e1c36da9d4af994b65ac"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "4c685d4a4a086e1e85f3b79dd210b55fb9a88da7108b107e1e5a5ffee298e48b2e9929ecddd472319ed61fe8a9b5bbb8aedc85b2d02b60a97aa37cff8ade52891c3a4b63e773fefe6cd9ecb3e041b62d9386669cbc310914625fa2b358e79d8217187ace78c26c931ab94df7548e5dfd69c94c60ceab8d60aee7a755f1f4b8e3"
      Suite = "bn256.adapter"
    [servers.Services.blsCoSiService]
      Public = "7db332aa55ea2756c1377e7cae6a40b5fb8364184fad975100fcd4a299488a5b59692da5eaf783da581c032d19f162be4f920dbb1839a40ada5280283aa49d6322d1a1fa6543b38a567f4ec90d314c5e65d5905cb857a525fdd8c4e04e021da75a34f9d68c3db2f7bc1571446167c7f0c15b71298d71a70b75899ce832d5b5fc"
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
