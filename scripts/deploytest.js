const hre = require("hardhat");

async function deploy() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const Counter = await hre.ethers.getContractFactory("test");
  const counter = await Counter.connect(contractOwner).deploy("0xE68bc74496741a1DF63f1BC28D06a5AAC4885FAc");
  await counter.waitForDeployment();

  console.log(`test deployed to: ${await counter.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
