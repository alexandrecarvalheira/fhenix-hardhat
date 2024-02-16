require("dotenv").config();
const ethers = require("ethers");
const axios = require("axios");
const keys = process.env.WALLET;

async function mnemonicToAddress() {
  if (!keys) {
    throw new Error("No keys in .env file");
  }
  const wallet = new ethers.Wallet(keys);

  console.log("Ethereum address: " + wallet.address);

  return "0xd7702EB6Ca4C101C918f7d4eaBeDc36e36260482";
}

async function callFaucet(address) {
  const response = await axios.get(`http://localhost:42000/faucet?address=${address}`);
  const data = await response.data;
  console.log(`Success!: ${JSON.stringify(data)}`);
}

mnemonicToAddress()
  .then((address) => callFaucet(address))
  .catch((e) => console.error(e));
