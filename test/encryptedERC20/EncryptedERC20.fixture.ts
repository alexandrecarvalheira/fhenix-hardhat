import hre from "hardhat";

import type { EncryptedERC20 } from "../../types";

export async function deployEncryptedERC20Fixture(): Promise<{ contract: EncryptedERC20; address: string }> {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  const contractFactory = await hre.ethers.getContractFactory("EncryptedERC20");
  const contract = await contractFactory.connect(contractOwner).deploy("Fhenix", "FHE");
  const address = await contract.getAddress();

  return { contract, address };
}
