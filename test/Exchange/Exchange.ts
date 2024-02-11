import { expect } from "chai";
import hre from "hardhat";

import { createFheInstance } from "../../utils/instance";
import type { Signers } from "../types";
import { deployEncryptedERC20Fixture, deployExchange } from "./Exchange.fixture";

describe("EExchange", function () {
  before(async function () {
    this.signers = {} as Signers;
    this.erc20token1 = {};
    this.erc20token2 = {};
    const signers = await hre.ethers.getSigners();
    this.signers.alice = signers[0];
    this.signers.bob = signers[1];
  });

  beforeEach(async function () {
    const { contract: token1, address: token1Address } = await deployEncryptedERC20Fixture();
    this.erc20token1.contract = token1;
    this.erc20token1.address = token1Address;

    const { contract: token2, address: token2Address } = await deployEncryptedERC20Fixture();
    this.erc20token2.contract = token2;
    this.erc20token2.address = token2Address;

    const { contract, address } = await deployExchange(token1Address, token2Address);
    this.exchange = contract;
    this.contractAddress = address;
    this.instances = await createFheInstance(hre, address);
  });

  it("should add liquidity", async function () {
    const amount1 = await this.instances.instance.encrypt_uint8(10);
    const amount2 = await this.instances.instance.encrypt_uint8(16);

    const approveToken1Tx = await this.erc20token1.contract!["approve(address,(bytes))"](this.contractAddress, amount1);
    await approveToken1Tx.wait();

    const approveToken2Tx = await this.erc20token2.contract!["approve(address,(bytes))"](this.contractAddress, amount2);
    await approveToken2Tx.wait();

    const addLiquidityTx = await this.exchange.addLiquidity(amount1, amount2);
    await addLiquidityTx.wait();

    const token1Balance = await this.erc20token1.contract!.balance(this.contractAddress);
    const token2Balance = await this.erc20token2.contract!.balance(this.contractAddress);
    expect(Number(token1Balance)).to.equal(10);
    expect(Number(token2Balance)).to.equal(16);

    const userBalance1 = await this.erc20token1.contract!.balance(this.signers.alice.address);
    const userBalance2 = await this.erc20token2.contract!.balance(this.signers.alice.address);
    expect(Number(userBalance1)).to.equal(100 - 10);
    expect(Number(userBalance2)).to.equal(100 - 16);

    const Ebalance = await this.exchange.balances(this.instances.permission);
    const balance = this.instances.instance.unseal(this.contractAddress, Ebalance);
    expect(Number(balance)).to.equal(5);

    const totalSupply = await this.exchange.getTotalSupply();
    expect(Number(totalSupply)).to.equal(5);
  });

  it("should remove liquidity", async function () {
    const amount1 = await this.instances.instance.encrypt_uint8(10);
    const amount2 = await this.instances.instance.encrypt_uint8(16);

    const approveToken1Tx = await this.erc20token1.contract!["approve(address,(bytes))"](this.contractAddress, amount1);
    await approveToken1Tx.wait();

    const approveToken2Tx = await this.erc20token2.contract!["approve(address,(bytes))"](this.contractAddress, amount2);
    await approveToken2Tx.wait();

    const addLiquidityTx = await this.exchange.addLiquidity(amount1, amount2);
    await addLiquidityTx.wait();

    const removeLiquidityTx = await this.exchange.removeLiquidity(await this.instances.instance.encrypt_uint8(2));
    await removeLiquidityTx.wait();

    const token1Balance = await this.erc20token1.contract!.balance(this.contractAddress);
    const token2Balance = await this.erc20token2.contract!.balance(this.contractAddress);
    expect(Number(token1Balance)).to.equal(6);
    expect(Number(token2Balance)).to.equal(10);

    const userBalance1 = await this.erc20token1.contract!.balance(this.signers.alice.address);
    const userBalance2 = await this.erc20token2.contract!.balance(this.signers.alice.address);
    expect(Number(userBalance1)).to.equal(90 + 4);
    expect(Number(userBalance2)).to.equal(84 + 6);

    const Ebalance = await this.exchange.balances(this.instances.permission);
    const balance = this.instances.instance.unseal(this.contractAddress, Ebalance);
    expect(Number(balance)).to.equal(3);

    const totalSupply = await this.exchange.getTotalSupply();
    expect(Number(totalSupply)).to.equal(3);
  });

  it("should swap", async function () {
    const amount1 = await this.instances.instance.encrypt_uint8(10);
    const amount2 = await this.instances.instance.encrypt_uint8(16);

    const approveToken1Tx = await this.erc20token1.contract!["approve(address,(bytes))"](this.contractAddress, amount1);
    await approveToken1Tx.wait();

    const approveToken2Tx = await this.erc20token2.contract!["approve(address,(bytes))"](this.contractAddress, amount2);
    await approveToken2Tx.wait();

    const addLiquidityTx = await this.exchange.addLiquidity(amount1, amount2);
    await addLiquidityTx.wait();

    const swapamount = await this.instances.instance.encrypt_uint8(3);
    const approveSwap = await this.erc20token1.contract!["approve(address,(bytes))"](this.contractAddress, swapamount);
    await approveSwap.wait();

    const swapTx = await this.exchange.swap(this.erc20token1.address!, swapamount);
    await swapTx.wait();

    const userBalance1 = await this.erc20token1.contract!.balance(this.signers.alice.address);
    const userBalance2 = await this.erc20token2.contract!.balance(this.signers.alice.address);
    expect(Number(userBalance1)).to.equal(90 - 3);
    expect(Number(userBalance2)).to.equal(84 + 1);

    const Ebalance = await this.exchange.balances(this.instances.permission);
    const balance = this.instances.instance.unseal(this.contractAddress, Ebalance);
    expect(Number(balance)).to.equal(5);
  });
});
