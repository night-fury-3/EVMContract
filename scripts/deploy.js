// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");

//deploy Lock contract
async function deployLock() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

async function deployToken(){
  const token = await hre.ethers.deployContract("MyToken", ["USDT Token", "USDTTK"]);
  await token.waitForDeployment();

  console.log(`Apple Token deployed to ${token.target}`)
}


async function deployStaker(){
  const contract1 = await hre.ethers.deployContract("ExternalStaker");
  await contract1.waitForDeployment();

  console.log(`ExternalStaker deployed to ${contract1.target}`)
  const contract2 = await hre.ethers.deployContract("Staker", [contract1.target]);
  await contract2.waitForDeployment();

  console.log(`Staker deployed to ${contract2.target}`)
  saveFrontendFiles(contract2, "Staker");
}


async function deployDutchAuction(){
  const nft = "0x8732c7Bd1129D9e0D016d901e3B3e93FE147A81E";
  const nftId = 2;
  const coinKind = 1;
  const decimal = 6;
  const coin = "0x7f4289BEc464f2cc4B76fF249fC7Ff20aa98917e";

  const startingPrice = 123456789;
  const disCounterRate = 10;
  const duration = 24;

  const seller = "0x336CEfBB247981B18Dd0c075b1155B16dDd51b3E";

  //const nftContract = await hre.ethers.deployContract("MyNFT");
  //const nftInstance = await nftContract.waitForDeployment();
  //await nftInstance.mint(seller, nftId);

  const contractInstance = await hre.ethers.deployContract("DutchAuction", [nft, nftId, coinKind, coin, startingPrice, disCounterRate, duration]);
  await contractInstance.waitForDeployment();

  //await nftInstance.approve(contractInstance.target, nftId)
  //console.log(`NFT contract deployed to ${nftInstance.target}`)
  console.log(`DutchAuction contract deployed to ${contractInstance.target}`)
}


function saveFrontendFiles(contract, contractName) {
  const fs = require("fs");
  const contractsDir = path.join("../", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const TokenArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    path.join(contractsDir, contractName + ".json"),
    JSON.stringify({ address: contract.target, abi: TokenArtifact.abi }, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployToken().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//deploy contract using ethers.js
// async function deployToken(){
//   const [deployer] = await ethers.getSigners();
//   console.log(
//     "Deploying the contracts with the account:",
//     await deployer.getAddress()
//   );

//   console.log("Account balance:", (await deployer.getBalance()).toString());

//   const Token = await ethers.getContractFactory("Token");
//   const token = await Token.deploy();
//   await token.deployed();

//   console.log("Token address:", token.address);

//   // We also save the contract's artifacts and address in the frontend directory
//   //saveFrontendFiles(token);
// }