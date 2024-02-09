import { FhenixClient, Permit, getPermit, removePermit } from "fhenixjs";

const hre = require("hardhat");

async function getCounter() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];
  // ERC20 deployed to: 0x34D29d65A5789f07358b55999afB90D3d288997F
  // ERC20 deployed to: 0xBf2CA6026553Cd08daB954B7fc51eD75dAd5e354
  // AMM deployed to: 0xEc3546f68593dddD6Fca089c903c5D60Ebd560B0

  const contractAddress = "0x3c30BC0FF3e2046436b093BC356f814634429F6f";
  const token1Address = "0x2b8b1a8ccA6c6A884f48fEc0508db62C69d1E5b8";
  const token2Address = "0xC17b4bC722a3eCF3fE3BBF6158885D6173B0809A";
  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const permit = await getPermit(contractAddress, provider);

  instance.storePermit(permit);
  const permission = instance.extractPermitPermission(permit);

  const AMM = await hre.ethers.getContractAt("EExchange", contractAddress);

  const amount1 = await instance.encrypt_uint8(10);
  const amount2 = await instance.encrypt_uint8(16);
  const token1 = await hre.ethers.getContractAt("EncryptedERC20", token1Address);
  const token2 = await hre.ethers.getContractAt("EncryptedERC20", token2Address);

  console.log("LP total supply:", await AMM.getTotalSupply());

  console.log("Approving...");
  const tx1 = await token1["approve(address,(bytes))"](contractAddress, amount1);
  await tx1.wait();

  const tx2 = await token2["approve(address,(bytes))"](contractAddress, amount2);
  await tx2.wait();

  console.log("Adding Liquidity...");
  const tx3 = await AMM.addLiquidity(amount1, amount2);
  await tx3.wait();

  console.log("Token 1 AMM Balance:", await token1.balance(contractAddress));
  console.log("Token 1 EOA Balance:", await token1.balance(contractOwner.address));

  console.log("Token 2 AMM Balance:", await token2.balance(contractAddress));
  console.log("Token 2 EOA Balance:", await token2.balance(contractOwner.address));

  const Ebalance = await AMM.balances(permission);
  const balance = instance.unseal(contractAddress, Ebalance);
  console.log("user LP balance:", balance);

  // const swapamount = await instance.encrypt_uint8(3);
  // const tx5 = await token1["approve(address,(bytes))"](contractAddress, swapamount);
  // await tx5.wait();

  // const tx4 = await AMM.swap(token1Address, swapamount);
  // await tx4.wait();

  // console.log("Token 1 AMM Balance:", await token1.balance(contractAddress));
  // console.log("Token 1 EOA Balance:", await token1.balance(contractOwner.address));

  // console.log("Token 2 AMM Balance:", await token2.balance(contractAddress));
  // console.log("Token 2 EOA Balance:", await token2.balance(contractOwner.address));

  // const Ebalance2 = await AMM.balances(permission);
  // const balance2 = instance.unseal(contractAddress, Ebalance2);
  // console.log("user LP balance:", balance2);

  // console.log("total supply:", await AMM.getTotalSupply());

  // REMOVE LIQUIDITY TESTS

  console.log("total supply:", await AMM.getTotalSupply());

  console.log("Removing Liquidity...");

  const tx4 = await AMM.removeLiquidity(await instance.encrypt_uint8(Number(balance) / 2));
  await tx4.wait();

  console.log("Token 1 AMM Balance:", await token1.balance(contractAddress));
  console.log("Token 1 EOA Balance:", await token1.balance(contractOwner.address));

  console.log("Token 2 AMM Balance:", await token2.balance(contractAddress));
  console.log("Token 2 EOA Balance:", await token2.balance(contractOwner.address));

  const Ebalance2 = await AMM.balances(permission);
  const balance2 = instance.unseal(contractAddress, Ebalance2);
  console.log("user LP balance:", balance2);

  console.log("total supply:", await AMM.getTotalSupply());
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
