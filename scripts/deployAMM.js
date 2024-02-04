const hre = require("hardhat");

async function deploy() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const name1 = "FHENIX";
  const symbol1 = "FHE";
  const name2 = "FHENIX2";
  const symbol2 = "FHE2";

  const EncryptedERC20 = await hre.ethers.getContractFactory("EncryptedERC20");

  const encryptedERC20_1 = await EncryptedERC20.connect(contractOwner).deploy(name1, symbol1);
  await encryptedERC20_1.waitForDeployment();
  console.log(`ERC20 deployed to: ${await encryptedERC20_1.getAddress()}`);

  const encryptedERC20_2 = await EncryptedERC20.connect(contractOwner).deploy(name2, symbol2);
  await encryptedERC20_2.waitForDeployment();

  console.log(`ERC20 deployed to: ${await encryptedERC20_2.getAddress()}`);

  const CPAMM = await hre.ethers.getContractFactory("CPAMM");
  const amm = await CPAMM.connect(contractOwner).deploy(
    await encryptedERC20_1.getAddress(),
    await encryptedERC20_2.getAddress(),
  );
  await amm.waitForDeployment();

  console.log(`AMM deployed to: ${await amm.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
