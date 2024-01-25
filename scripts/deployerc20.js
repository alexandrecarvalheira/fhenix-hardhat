const hre = require("hardhat");

async function deploy() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const name = "TestShieldedToken";
  const symbol = "TST";

  const EncryptedERC20 = await hre.ethers.getContractFactory("EncryptedERC20");
  const encryptedERC20 = await EncryptedERC20.connect(contractOwner).deploy(name, symbol);
  await encryptedERC20.waitForDeployment();

  console.log(`Counter deployed to: ${await encryptedERC20.getAddress()}`);
}

if (require.main === module) {
  // === This is for deploying a new diamond ===
  deploy()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
