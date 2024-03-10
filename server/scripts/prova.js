const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1.js")




// wallet con coppia pubkey : privkey
let wallets = {
    "02d876810978f94961192da2b03a416952bb936687c9226ce15fe352dd18c4f914": "5ecf46792511bd32a76bc50bc64eca4f1e86d31e54446235a449e59e29afc002",
    "026c46ecbf06fcde512fc25515c0f1182551fdafe57d3034a4ac151351df126f21": "6a6817516e41ffee79631593896f6218b90412e1975362abf9fca44937186da4",
    "0298876078dcc7400abc28fe64ba756d4103d75ba4c5f1317cfa4deb2bc565d31b": "028710d3a895b1c53d3570d94cf5eeeac7dd734a80ac4599aa329bc9cf9b3929"
  };
  
  
  const balances = {
    "02d876810978f94961192da2b03a416952bb936687c9226ce15fe352dd18c4f914" : 1000,
    "026c46ecbf06fcde512fc25515c0f1182551fdafe57d3034a4ac151351df126f21": 50,
    "0298876078dcc7400abc28fe64ba756d4103d75ba4c5f1317cfa4deb2bc565d31b": 75,
  };

  var sender = "02d876810978f94961192da2b03a416952bb936687c9226ce15fe352dd18c4f914"
  var recipient = "026c46ecbf06fcde512fc25515c0f1182551fdafe57d3034a4ac151351df126f21"
  var amount = 10

  if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
  } else {
        // creo un messaggio composto dalle info della tx ( sender, recepient, amount )
        var msg = sender +  recipient + amount
        var hash = hashMessage(msg)
        console.log("Msg Hashed: ", hash)
        // firmo il msg passando l'hash dello stesso e la chiave privata corrispondente all'address del sender
        var sign = signThx(hash,wallets[sender])
        console.log("signature: ", sign)

        // https://github.com/paulmillr/noble-curves
        // Per recuperare la pubkey è sufficiente usare il metodo recoverPublicKey incluso nella signature,
        // convertire in bytes e successivamente in Hex
        console.log("recovered pub key: ", toHex(sign.recoverPublicKey(hash).toRawBytes()))
        var recoveredPubKey = toHex(sign.recoverPublicKey(hash).toRawBytes())

        // se il server riconosce che chi ha firmato il messaggio corrisponde all'address del sender allora trasferisce
        if ( recoveredPubKey === sender ){
          balances[sender] -= amount;
          balances[recipient] += amount;
          res.send({ balance: balances[sender] });
        }
    }

    // funzione di hash
function hashMessage(message) {
    return keccak256(utf8ToBytes(message))
}

function signThx(hash, senderKey){
  return secp.secp256k1.sign(hash, senderKey)
}