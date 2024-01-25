const hre = require("hardhat");

async function deploy() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.connect(contractOwner).deploy();
  await counter.waitForDeployment();

  console.log(`Counter deployed to: ${await counter.getAddress()}`);
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
