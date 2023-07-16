// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("ExpensiveMessage");
  await contract.waitForDeployment();
  console.log(
    `Deployed to ${contract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//DEPLOY WITH LEDGER + ETHERS.JS V5
// const hre = require("hardhat");
// const { LedgerSigner } = require("@anders-t/ethers-ledger");  
// async function main () {
  
//   const ledger = new LedgerSigner(hre.ethers.provider);                                                                                                                              
//   const Contract = await hre.ethers.getContractFactory('ExpensiveMessage');
//   console.log('Deploying Escrow...');
//   let contractFactory = Contract.connect(ledger);
//   const escrow = await contractFactory.deploy();
//   await escrow.deployed();
//   console.log('Escrow deployed to:', escrow.address);
// }
// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });
