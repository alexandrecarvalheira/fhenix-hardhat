import { FhenixClient, Permit, getPermit, removePermit } from "fhenixjs";

const hre = require("hardhat");

async function getCounter() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];
  // ERC20 deployed to: 0x2468bbf5023Dd6ceB0A877317B39001B3B290A86
  // ERC20 deployed to: 0x8377c1D4Cfe6670c0107Ab19C1bD6ADdeF004a29
  // AMM deployed to: 0xFE285A1229824718Aba6ba0fc7e645E0EfCDaA29

  const contractAddress = "0xFE285A1229824718Aba6ba0fc7e645E0EfCDaA29";

  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const permit = await getPermit("0x2468bbf5023Dd6ceB0A877317B39001B3B290A86", provider);

  instance.storePermit(permit);
  const permission = instance.extractPermitPermission(permit);
  console.log(permission);
  console.log(contractOwner.address);
  const AMM = await hre.ethers.getContractAt("CPAMM", contractAddress);

  const amount = await instance.encrypt_uint32(10000);
  // console.log(contractOwner.address, permission);
  const token1 = await hre.ethers.getContractAt("EncryptedERC20", "0x2468bbf5023Dd6ceB0A877317B39001B3B290A86");

  // await token1["approve(address,(bytes))"](contractAddress, amount);
  // const Ebalance = await token1.allowance(contractOwner.address, contractAddress, permission);
  // const balance = instance.unseal("0x2468bbf5023Dd6ceB0A877317B39001B3B290A86", Ebalance);
  // console.log(balance);
  const response = await AMM.addLiquidity(amount, amount);
  console.log(response);
  // const response = await AMM.balanceOf(contractOwner.address);
  // console.log(response);

  //   const response = await Counter.connect(contractOwner).getCounter(permission);
  //   const plaintext = await instance.unseal(contractAddress, response);
  //   console.log({ plaintext });
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
