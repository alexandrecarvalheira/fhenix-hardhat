import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const name = "FHENIX";
  const symbol = "FHE";

  const counter = await deploy("EncryptedERC20", {
    from: deployer,
    args: [name, symbol],
    log: true,
    skipIfAlreadyDeployed: false,
  });

  console.log(`EncryptedERC20 contract: `, counter.address);
};

export default func;
func.id = "deploy_EncryptedERC20";
func.tags = ["EncryptedERC20"];

//0xf221CFc17E5A437aCEb19e7Ad0620562300e5061
