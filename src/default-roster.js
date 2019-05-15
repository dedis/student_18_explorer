export default `
[[servers]]
 Address = "tls://128.178.109.59:6879"
 Url = "https://conode01.epfl.ch"
 Suite = "Ed25519"
 Public = "2e43fb119b319188172c7c1d74a349dba41b357aecf5deec39d75917b956a89e"
 Description = "VPSI"
 [servers.Services]
   [servers.Services.ByzCoin]
     Public = "6dc2440615ab11d3d256f61f3b02acfa575ac12a4183d4860c7c66d4825574b12fe3e97a7077649ca119a87ef838edb96a7fed48e7e22f880685d86496a78f8942b22bc5b1643bd47f3d2a72376db36a817fe81f40a3edf2405e1590cfdb915f3db784940e95582993ce2ffb293a6bd9470bbb5444ba5fae008c39f3b6b1b091"
     Suite = "bn256.adapter"
   [servers.Services.Skipchain]
     Public = "3275fe9265ecebb41f9202eb4e82311316327a982b3a0ef0c96ad93943f3a0515c616e52bb39fe2fccfef138e727038f529e7b99b6ba2c95455b2b729419956f463e4d1bb4f690aafca15b6d0549787bf8a75cc219f93e614127b089941572671ea62ca0f96254013094aae705b2ca6f588c5bd3357e0bfe73147d91850fe627"
     Suite = "bn256.adapter"
`
