const MetaCoin = artifacts.require("MetaCoin"),
  numUnit = 5000,
  { reduceString } = require("../utils/index.js")

contract("MetaCoin", accounts => {
  it(`owner(${reduceString(accounts[0])}) mints ${numUnit} units to an address: ${reduceString(accounts[1])}`, async () => {
    const metaCoin = await MetaCoin.deployed(),
      { logs: { 0: {
        args
      } } } = await metaCoin.mint(accounts[1], numUnit, {
        from: accounts[0]
      })
    assert.deepEqual({
      from: args.from, to: args.to, amount: args.amount.toNumber()
    }, {
      from: accounts[0], to: accounts[1], amount: numUnit
    })
  })
  it(`gets balance of address: ${reduceString(accounts[1])} => ${numUnit}`, async () => {
    const metaCoin = await MetaCoin.deployed(),
      balance = await metaCoin.balances(accounts[1])
    assert.equal(balance.toNumber(), numUnit)
  })
  it(`sends ${numUnit - 3e3} coins from address ${reduceString(accounts[1])} to ${reduceString(accounts[2])}`, async () => {
    const metaCoin = await MetaCoin.deployed(),
      { logs: { 0: {
        args
      } } } = await metaCoin.sendCoin(accounts[2], numUnit - 3e3, {
        from: accounts[1]
      })
    assert.deepEqual({
      from: args.from, to: args.to, amount: args.amount.toNumber()
    }, {
      from: accounts[1], to: accounts[2], amount: numUnit - 3e3
    })
  })
})