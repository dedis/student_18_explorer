export default `
[[servers]]
  Address = "tls://fairywren.ch:7770"
  Suite = "Ed25519"
  Public = "0bcdaebde16f50fb65b717a0501e7ede020045286d6ece10fdea1bdd8f37af39"
  Description = "Gaylor's Conode"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "2754e502579e77f92322458022f6b97ff18471f2e7523028ea6dab720da11ab189f98ef9a0308c7aa656f3339baded992248def25e3e2e1428c1601809579b934bb2aaf66b3d8a68712f68d744661d270278ebcf434204af961c729db6db85a54930dfe6b75184647d0e81138db2a87ccaeccff3500be2bf409827eef5ec150d"
      Suite = "bn256.adapter"
    [servers.Services.PoPServer]
      Public = "56f8aff826b48f4ccb60ce5aabf1484d3156533c6de378c8c9c209cf38d3e75249cd1dcc833a50173b59a27dd885683fbc68fabb536f0a55f89167fb7b2c393710564e2f9876dcef0067b68cf695d944e5d116420726cc1e20f48d20dc5dc4f96e5b9a9d35eb7b5a46059fc8aad4ce4ff282b89b6b1fd840eabbf307fe56338c"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "69088f9df0396cfd296eeeb060bc84d807f3f2cf3b02b8eafd953f30e9e979a203fd11035e9f1fca2662383841c3c630ee3554150ec2b5fdb50819a22a2682dd341f0424fec4eafb8a17041b939ef18eabdd8c38e2f057619a541c506bbae5755265ae6b9156690b7a2907ca0ec6394d79363d5492aa2c9512e3fba882aad358"
      Suite = "bn256.adapter"
    [servers.Services.blsCoSiService]
      Public = "753367383700559bc310a2ba7d201b19e00c5bd37fa9fc0c7914757b1d88bfc35b3f00fefb25a6cb2bb0f46f7b5d0439493f0ecb8aae1d6b939a1b0fa38a850b43be80468dc1cd5f81f9f57e22931c4535541c7f5565b5b46c0f26897764322a1aaacb7ad312396c995c3c934b8106fa4bcb4c370ebe6264e2cae376735f715a"
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
