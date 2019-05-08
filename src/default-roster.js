export default `
[[servers]]
  Address = "tls://128.178.151.82:6879"
  Suite = "Ed25519"
  Public = "bcb38349b470946c6b3fb3ac66a7436e0a1f138a42af2af3bada0d69a1712c2c"
  Description = "DEDIS"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "857d99faec6e7734b7b0ae7212d1945d0f6174f7fa79fd3c3b051156a816cb8d50ad955f2d788f3c8d6ccf2398f9800c4c70d5effc93e4f4bcd990ed9fe463646db886d98f1bd23f443fa2d446b2f57219a7c9303e4ce3a7747caff81bbafb3e1427978bc1d09ead1cb63ad2fcb8325ad3365a92e1dd80ae20953fe05e5ad842"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "568e39f8eccf435e67dffe7943e3362ca7bf3fee7024c1457d23ec07e0789b6e742a9a64dfa52b3defbd1760dc24d62890413f0c189867eaef150fa3941ce943246d8ed27981863306c866e59d87bdc53ba5241c3200e32b9980c44f442dccc72881f8a72dd20f9405fa2e8308261e8adc3b8043f3567d3d5b74f18ed48ca521"
      Suite = "bn256.adapter"
`
