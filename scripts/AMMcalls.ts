import { FhenixClient, Permit, getPermit, removePermit } from "fhenixjs";

const hre = require("hardhat");

async function getCounter() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];
  // ERC20 deployed to: 0x34D29d65A5789f07358b55999afB90D3d288997F
  // ERC20 deployed to: 0xBf2CA6026553Cd08daB954B7fc51eD75dAd5e354
  // AMM deployed to: 0xEc3546f68593dddD6Fca089c903c5D60Ebd560B0

  const contractAddress = "0x0A29DD2E828A37b4e0710a18fE52eB8Ad7AECf87";
  const token1Address = "0xbeb4eF1fcEa618C6ca38e3828B00f8D481EC2CC2";
  const token2Address = "0x5c93e3B7824035B375E373FaC1578D4089dcE77A";
  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const permit = await getPermit(token2Address, provider);

  instance.storePermit(permit);
  const permission = instance.extractPermitPermission(permit);

  const AMM = await hre.ethers.getContractAt("CPAMM", contractAddress);

  const amount = await instance.encrypt_uint32(10000);
  // console.log(contractOwner.address, permission);
  const token1 = await hre.ethers.getContractAt("EncryptedERC20", token1Address);
  const token2 = await hre.ethers.getContractAt("EncryptedERC20", token2Address);

  // const tx1 = await token1.balance(contractAddress);
  // await tx1.wait();

  // const Ebalance = await token2["balanceOf((bytes32,bytes))"](permission);
  // const balance = instance.unseal(token2Address, Ebalance);
  // console.log(balance);

  const tx1 = await token1["approve(address,(bytes))"](contractAddress, amount);
  await tx1.wait();

  const tx2 = await token2["approve(address,(bytes))"](contractAddress, amount);
  await tx2.wait();

  // const Ebalance = await token2.allowance(contractOwner, contractAddress, permission);
  // // console.log(await token2.balance(contractOwner));
  // // const Ebalance = await AMM.balances(permission);
  // const balance = instance.unseal(token2Address, Ebalance);
  // console.log(balance);

  // await token2["approve(address,(bytes))"](contractAddress, amount);
  // const Ebalance = await token2["balanceOf((bytes32,bytes))"](permission);
  // const balance = instance.unseal(token2Address, Ebalance);
  // console.log(balance);

  const tx3 = await AMM.addLiquidity(amount, amount);
  await tx3.wait();

  console.log(await token1.balance(contractAddress));
  console.log(await token2.balance(contractAddress));

  // console.log(await AMM.addLiquidity(amount, amount));

  // const Ebalance = await AMM.balances(permission);
  // const balance = instance.unseal(contractAddress, Ebalance);
  // console.log(balance);
  // console.log(await token1.balanceOf());
  // console.log(await token2.balanceOf());
  // const Ebalance = await token1.allowance(contractOwner.address, contractAddress, permission);
  // const balance = instance.unseal("0x2468bbf5023Dd6ceB0A877317B39001B3B290A86", Ebalance);
  // console.log(balance);
  // const response = await AMM.addLiquidity(amount, amount);
  // console.log(response);
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
