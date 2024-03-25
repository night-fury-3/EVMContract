require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = "ce01f26c3ae247d1924c96274aae0337";
const ACCOUNT_PRIVATE_KEY =
  "f8b4d6927c6ec050eefc6395bdbc18e5a430106006a2bf59412ebb04f5190969";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: "2MI6UY7GWFH3SAAMFY23JXFIKHX7V84XWW",
  },
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
