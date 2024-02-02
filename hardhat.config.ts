// import "@nomicfoundation/hardhat-toolbox";
// import "dotenv/config";
// import "hardhat-deploy";
// import type { HardhatUserConfig } from "hardhat/config";
// import "./tasks/accounts";
// import "./tasks/add";
// import "./tasks/getCount";
// const account1 = process.env.WALLET1 || "0x";
// const account2 = process.env.WALLET2 || "0x";
// const accounts: string[] = [account1, account2];
// // Ensure that we have all the environment variables we need.
// if (!accounts[0]) {
//   throw new Error("Please set your MNEMONIC in a .env file");
// }
// const config: HardhatUserConfig = {
//   defaultNetwork: "localfhenix",
//   namedAccounts: {
//     deployer: 0,
//   },
//   etherscan: {
//     apiKey: {
//       arbitrumOne: process.env.ARBISCAN_API_KEY || "",
//       avalanche: process.env.SNOWTRACE_API_KEY || "",
//       bsc: process.env.BSCSCAN_API_KEY || "",
//       mainnet: process.env.ETHERSCAN_API_KEY || "",
//       optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
//       polygon: process.env.POLYGONSCAN_API_KEY || "",
//       polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
//       sepolia: process.env.ETHERSCAN_API_KEY || "",
//     },
//   },
//   gasReporter: {
//     currency: "USD",
//     enabled: process.env.REPORT_GAS ? true : false,
//     excludeContracts: [],
//     src: "./contracts",
//   },
//   networks: {
//     testnet: {
//       accounts,
//       chainId: 412346,
//       url: "https://test01.fhenix.zone/evm",
//     },
//     devnet: {
//       accounts,
//       chainId: 5432,
//       url: "https://devnet.fhenix.io",
//     },
//     ci_localfhenix: {
//       accounts,
//       chainId: 5432,
//       url: "https://localfhenix:8545",
//     },
//     localfhenix: {
//       accounts,
//       chainId: 5432,
//       url: "http://localhost:8545",
//     },
//   },
//   paths: {
//     artifacts: "./artifacts",
//     cache: "./cache",
//     sources: "./contracts",
//     tests: "./test",
//   },
//   solidity: {
//     version: "0.8.20",
//     settings: {
//       metadata: {
//         // Not including the metadata hash
//         // https://github.com/paulrberg/hardhat-template/issues/31
//         bytecodeHash: "none",
//       },
//       // Disable the optimizer when debugging
//       // https://hardhat.org/hardhat-network/#solidity-optimizer-support
//       optimizer: {
//         enabled: false,
//         runs: 800,
//       },
//     },
//   },
//   typechain: {
//     outDir: "types",
//     target: "ethers-v6",
//   },
// };
// export default config;
// Plugins
import "@nomicfoundation/hardhat-toolbox";
import "fhenix-hardhat-docker";
import "fhenix-hardhat-plugin";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";

// Tasks

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  // Optional: defaultNetwork is already being set to "localfhenix" by fhenix-hardhat-plugin
  defaultNetwork: "localfhenix",
};

export default config;
