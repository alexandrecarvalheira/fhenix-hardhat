const hre = require("hardhat");

async function deploy() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.connect(contractOwner).deploy();
  await counter.waitForDeployment();

  console.log(`Counter deployed to: ${await counter.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
