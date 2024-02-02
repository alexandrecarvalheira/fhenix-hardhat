const hre = require("hardhat");

async function deploy() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const name = "FHENIX";
  const symbol = "FHE";

  const EncryptedERC20 = await hre.ethers.getContractFactory("EncryptedERC20");
  const encryptedERC20 = await EncryptedERC20.connect(contractOwner).deploy(name, symbol);
  await encryptedERC20.waitForDeployment();

  console.log(`encryptedERC20 deployed to: ${await encryptedERC20.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
