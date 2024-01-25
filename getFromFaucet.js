require("dotenv").config();
const ethers = require("ethers");
const axios = require("axios");
const keys = process.env.WALLET;

async function mnemonicToAddress() {
  let words = process.env.MNEMONIC;

  const mnemonic = ethers.Mnemonic.fromPhrase(words);
  if (!mnemonic) {
    throw new Error("No MNEMONIC in .env file");
  }
  const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);

  console.log("Ethereum address: " + wallet.address);
  return wallet.address;
}

async function callFaucet(address) {
  const response = await axios.get(`http://localhost:6000/faucet?address=0x686FeDa3Fe8613f3b9c006128b79798626A3C2EC`);
  const data = await response.data;
  console.log(`Success!: ${JSON.stringify(data)}`);
}

mnemonicToAddress()
  .then((address) => callFaucet(address))
  .catch((e) => console.error(e));
