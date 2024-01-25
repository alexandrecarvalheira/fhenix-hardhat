import { JsonRpcProvider } from "ethers";
import { FhenixClient, Permit, getPermit } from "fhenixjs";

const hre = require("hardhat");

async function getCounter() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  const contractAddress = "0x0d58B6DA41a1d6982599B0c34DB660472695bbe7";

  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const oldpermit = await instance.exportPermits();
  console.log(oldpermit);

  const permit = await getPermit(contractAddress, provider);
  instance.storePermit(permit);
  const permission = instance.extractPermitPermission(permit);
  console.log(oldpermit);

  const Counter = await hre.ethers.getContractAt("Counter", contractAddress);

  const response = await Counter.connect(contractOwner).getCounter(permission);
  const plaintext = await instance.unseal(contractAddress, response);
  console.log({ plaintext });
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
