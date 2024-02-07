import { FhenixClient, Permit, getPermit, removePermit } from "fhenixjs";

const hre = require("hardhat");

async function getCounter() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  const contractAddress = "0x97676c46DF9566ebE9f5922C619dda7d88DE98F7";
  const tokenAdress = "0xE68bc74496741a1DF63f1BC28D06a5AAC4885FAc";
  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const AMM = await hre.ethers.getContractAt("test", contractAddress);
  const token = await hre.ethers.getContractAt("ERC20", tokenAdress);

  await token.mint(1000);

  console.log(await token.balanceOf(contractOwner));

  //   const amount = await instance.encrypt_uint32(10000);
  //   console.log(await AMM.addValueEncrypted(amount));
}

if (require.main === module) {
  // === This is for deploying a new diamond ===
  getCounter()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
