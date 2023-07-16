const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();

  await myContract.deployed();

  console.log("MyContract deployed to:", myContract.address);
}

main();
