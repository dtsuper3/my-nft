import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
const { API_URL, PRIVATE_KEY } = process.env;


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  // defaultNetwork: "sepolia",
  // networks: {
  //   hardhat: {},
  //   sepolia: {
  //     url: API_URL,
  //     accounts: [`0x${PRIVATE_KEY}`],
  //   },
  // },
  networks: {
    hardhat: {
      chainId: 1337, // Hardhat's default chain ID
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },

};

export default config;
