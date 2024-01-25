import axios from "axios";
import hre from "hardhat";

import type { Counter } from "../../types";
import { waitForBlock } from "../../utils/block";

export async function deployCounterFixture(): Promise<{ counter: Counter; address: string }> {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  const counterFactory = await hre.ethers.getContractFactory("Counter");
  const counter = await counterFactory.connect(contractOwner).deploy();
  const address = await counter.getAddress();
  return { counter, address };
}

export async function getTokensFromFaucet() {
  if (hre.network.name === "localfhenix") {
    const signers = await hre.ethers.getSigners();

    if ((await hre.ethers.provider.getBalance(signers[0].address)).toString() === "0") {
      console.log("Balance for signer is 0 - getting tokens from faucet");
      await axios.get(`http://localhost:6000/faucet?address=${signers[0].address}`);
      await waitForBlock(hre);
    }
  }
}
