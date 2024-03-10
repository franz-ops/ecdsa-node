const secp = require("ethereum-cryptography/secp256k1.js")
const { toHex } = require("ethereum-cryptography/utils.js")


for (i=0; i<3; i++){
    const private = secp.secp256k1.utils.randomPrivateKey()
    const privateHex = toHex(private)

    const public = secp.secp256k1.getPublicKey(private)
    const publicHex = toHex(public)

    console.log("key nr ",i+1)
    console.log("private key: ", privateHex)
    console.log("public key: ",publicHex)

}
