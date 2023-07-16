// Run with: npx hardhat test
const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");

describe("ExpensiveMessage", function () {
  async function fixture() {
    const contract = await ethers.deployContract("ExpensiveMessage");
    const owner = await contract.owner();
    const message = await contract.message();
    const messenger = await contract.messenger();
    const price = await contract.currentPrice();
    return { contract, owner, message, messenger, price };
  }
  describe("Deployment", function () {
  it("Should deploy, set owner and initial message", async function () {
    const { contract } = await loadFixture(fixture);
    expect(await contract.owner()).to.not.equal(0);
    console.log(await contract.owner());
    expect(await contract.message()).to.equal("Hello World!");
    console.log(await contract.message());
    });
    // await message.setMessage("Hola, mundo!");
    // expect(await message.message()).to.equal("Hola, mundo!");
    });
  describe("Message", function () {
    it("Should set message", async function () {
      // Arrange
      const { contract, price } = await loadFixture(fixture);
      const tx = await contract.setMessage("Hola, mundo!", {value: ethers.parseEther("0.05")});
      const tx2 = await contract.setMessage("Hola, mundo!", {value: ethers.parseEther("0.1")});
      // Act
      await tx.wait();
      await tx2.wait();
      // Assert
      expect(await contract.message()).to.equal("Hola, mundo!");
    });
    it("Should let owner withdraw ETH", async function () {
      // Arrange
      const { contract, owner } = await loadFixture(fixture);
      const tx = await contract.setMessage("Hola, mundo!", {value: ethers.parseEther("0.05")});
      await tx.wait();
      // Act
      const balanceBefore = await ethers.provider.getBalance(owner);
      const tx2 = await contract.withdraw();
      await tx2.wait();
      const balanceAfter = await ethers.provider.getBalance(owner);
      // Assert
      expect(balanceAfter).to.be.gt(balanceBefore);
    }
    );
  }); 
  });
