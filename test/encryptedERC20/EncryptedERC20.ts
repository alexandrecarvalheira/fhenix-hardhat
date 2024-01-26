import { expect } from "chai";
import hre from "hardhat";

import { createFheInstance } from "../../utils/instance";
import type { Signers } from "../types";
import { deployEncryptedERC20Fixture } from "./EncryptedERC20.fixture";

describe("EncryptedERC20", function () {
  before(async function () {
    this.signers = {} as Signers;
    const signers = await hre.ethers.getSigners();
    this.signers.alice = signers[0];
    this.signers.bob = signers[1];
  });

  beforeEach(async function () {
    const { contract, address } = await deployEncryptedERC20Fixture();
    this.erc20 = contract;
    this.contractAddress = address;
    this.instances = await createFheInstance(hre, address);
  });

  it("should mint the contract", async function () {
    const transaction = await this.erc20.mint(1000);
    await transaction.wait();
    // Call the method

    const encryptedBalance = await this.erc20.balanceOf(this.signers.alice.address, this.instances.permission);
    // Decrypt the balance
    const balance = this.instances.instance.unseal(this.contractAddress, encryptedBalance);
    expect(balance).to.equal(1000);

    const totalSupply = await this.erc20.totalSupply();
    // Decrypt the total supply
    expect(totalSupply).to.equal(1000);
  });

  it("should transfer tokens between two users", async function () {
    const transaction = await this.erc20.mint(10000);
    await transaction.wait();
    const encryptedTransferAmount = await this.instances.instance.encrypt_uint32(1337);
    const tx = await this.erc20["transfer(address,(bytes))"](this.signers.bob.address, encryptedTransferAmount);
    await tx.wait();

    const encryptedBalanceAlice = await this.erc20.balanceOf(this.signers.alice.address, this.instances.permission);

    // Decrypt the balance
    const balanceAlice = this.instances.instance.unseal(this.contractAddress, encryptedBalanceAlice);
    expect(Number(balanceAlice)).to.equal(10000 - 1337);

    const encryptedBalanceBob = await this.erc20.balanceOf(this.signers.bob.address, this.instances.permission);

    // Decrypt the balance
    const balanceBob = this.instances.instance.unseal(this.contractAddress, encryptedBalanceBob);
    expect(Number(balanceBob)).to.equal(1337);
  });

  it("should not transfer tokens between two users", async function () {
    const transaction = await this.erc20.mint(1000);
    await transaction.wait();

    const encryptedTransferAmount = await this.instances.instance.encrypt_uint32(1337);
    const tx = await this.erc20["transfer(address,(bytes))"](this.signers.bob.address, encryptedTransferAmount);
    await tx.wait();

    const encryptedBalanceAlice = await this.erc20.balanceOf(this.signers.alice.address, this.instances.permission);

    // Decrypt the balance
    const balanceAlice = this.instances.instance.unseal(this.contractAddress, encryptedBalanceAlice);

    expect(balanceAlice).to.equal(1000);

    const encryptedBalanceBob = await this.erc20.balanceOf(this.signers.bob.address, this.instances.permission);

    // Decrypt the balance
    const balanceBob = this.instances.instance.unseal(this.contractAddress, encryptedBalanceBob);

    expect(balanceBob).to.equal(0);
  });

  it("should be able to transferFrom only if allowance is sufficient", async function () {
    const transaction = await this.erc20.mint(10000);
    await transaction.wait();

    const encryptedAllowanceAmount = await this.instances.instance.encrypt_uint32(1337);
    const tx = await this.erc20["approve(address,(bytes))"](this.signers.bob.address, encryptedAllowanceAmount);
    await tx.wait();

    const encryptedTransferAmount = await this.instances.instance.encrypt_uint32(1338); // above allowance so next tx should actually not send any token
    const tx2 = await this.erc20
      .connect(this.signers.bob)
      ["transferFrom(address,address,(bytes))"](
        this.signers.alice.address,
        this.signers.bob.address,
        encryptedTransferAmount,
      );
    await tx2.wait();

    const encryptedBalanceAlice = await this.erc20.balanceOf(this.signers.alice.address, this.instances.permission);

    // Decrypt the balance
    const balanceAlice = this.instances.instance.unseal(this.contractAddress, encryptedBalanceAlice);
    expect(balanceAlice).to.equal(10000); // check that transfer did not happen, as expected

    const encryptedBalanceBob = await this.erc20.balanceOf(this.signers.bob.address, this.instances.permission);
    // Decrypt the balance
    const balanceBob = this.instances.instance.unseal(this.contractAddress, encryptedBalanceBob);
    expect(balanceBob).to.equal(0); // check that transfer did not happen, as expected

    const encryptedTransferAmount2 = await this.instances.instance.encrypt_uint32(1337); // above allowance so next tx should actually not send any token
    const tx3 = await this.erc20
      .connect(this.signers.bob)
      ["transferFrom(address,address,(bytes))"](
        this.signers.alice.address,
        this.signers.bob.address,
        encryptedTransferAmount2,
      );
    await tx3.wait();

    const encryptedBalanceAlice2 = await this.erc20.balanceOf(this.signers.alice.address, this.instances.permission);

    // Decrypt the balance
    const balanceAlice2 = this.instances.instance.unseal(this.contractAddress, encryptedBalanceAlice2);
    expect(balanceAlice2).to.equal(10000 - 1337); // check that transfer did happen this time

    const encryptedBalanceBob2 = await this.erc20.balanceOf(this.signers.bob.address, this.instances.permission);
    const balanceBob2 = this.instances.instance.unseal(this.contractAddress, encryptedBalanceBob2);
    expect(balanceBob2).to.equal(1337); // check that transfer did happen this time
  });
});
