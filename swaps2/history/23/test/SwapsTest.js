const truffleAssert = require('truffle-assertions');
const Swaps = artifacts.require("Swaps");
const Vault = artifacts.require("Vault");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");

contract("Swaps",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractSwaps = null;
  let contractVault = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Swaps.link("SafeMath",contractSafeMath.address);
    contractSwaps = await Swaps.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Swaps.new({from: accounts[0]}');
    contractVault = await Vault.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Vault.new({from: accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint,bytes)', async () => {
    let result = await contractSwaps.tokenFallback(accounts[3], 255, [8,174,231,59,188,60,199,99,179,133,219,181,139,52,232,11,156,58,210,40,33,4,169,31,69,99,249,157,166,177,5,88],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([112,27,9,166,8,222,253,136,146,154,1,120,243,223,17,210,244,159,42,74,49,187,8,112,80,64,175,150,111,146,195,112], accounts[2], accounts[6], 27, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 96, 9, accounts[5], 4, 1532892062,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([112,27,9,166,8,222,253,136,146,154,1,120,243,223,17,210,244,159,42,74,49,187,8,112,80,64,175,150,111,146,195,112], accounts[6], accounts[6], 27, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 96, 9, accounts[5], 4, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([112,27,9,166,8,222,253,136,146,154,1,120,243,223,17,210,244,159,42,74,49,187,8,112,80,64,175,150,111,146,195,112], accounts[2], accounts[6], 0, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 96, 9, accounts[5], 4, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([112,27,9,166,8,222,253,136,146,154,1,120,243,223,17,210,244,159,42,74,49,187,8,112,80,64,175,150,111,146,195,112], accounts[2], accounts[6], 27, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 96, 9, accounts[5], 4, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([112,27,9,166,8,222,253,136,146,154,1,120,243,223,17,210,244,159,42,74,49,187,8,112,80,64,175,150,111,146,195,112], accounts[2], accounts[6], 27, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 96, 9, accounts[5], 4, 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([30,113,37,224,223,23,168,109,18,4,14,74,24,116,124,114,150,233,237,187,80,189,63,218,82,43,118,174,249,117,89,232], accounts[3], accounts[1], 2, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+871, accounts[8], 11, 11, "0x0000000000000000000000000000000000000000", 2014223714, 4038714811,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,113,37,224,223,23,168,109,18,4,14,74,24,116,124,114,150,233,237,187,80,189,63,218,82,43,118,174,249,117,89,232], accounts[1], accounts[1], 2, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+871, accounts[8], 11, 11, "0x0000000000000000000000000000000000000000", 2014223714, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,113,37,224,223,23,168,109,18,4,14,74,24,116,124,114,150,233,237,187,80,189,63,218,82,43,118,174,249,117,89,232], accounts[3], accounts[1], 0, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+871, accounts[8], 11, 11, "0x0000000000000000000000000000000000000000", 2014223714, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,113,37,224,223,23,168,109,18,4,14,74,24,116,124,114,150,233,237,187,80,189,63,218,82,43,118,174,249,117,89,232], accounts[3], accounts[1], 2, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+871, accounts[8], 11, 11, "0x0000000000000000000000000000000000000000", 2014223714, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,113,37,224,223,23,168,109,18,4,14,74,24,116,124,114,150,233,237,187,80,189,63,218,82,43,118,174,249,117,89,232], accounts[3], accounts[1], 2, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 11, 11, "0x0000000000000000000000000000000000000000", 2014223714, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await contractSwaps.createOrder([153,29,222,4,223,33,44,86,72,174,236,255,156,197,40,76,7,157,156,44,98,219,33,97,243,121,48,170,209,154,51,100], accounts[3], accounts[1], 96, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+446, accounts[9], 1338, 9, accounts[2], 257, 0,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([153,29,222,4,223,33,44,86,72,174,236,255,156,197,40,76,7,157,156,44,98,219,33,97,243,121,48,170,209,154,51,100], accounts[1], accounts[1], 96, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+446, accounts[9], 1338, 9, accounts[2], 257, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([153,29,222,4,223,33,44,86,72,174,236,255,156,197,40,76,7,157,156,44,98,219,33,97,243,121,48,170,209,154,51,100], accounts[3], accounts[1], 0, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+446, accounts[9], 1338, 9, accounts[2], 257, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([153,29,222,4,223,33,44,86,72,174,236,255,156,197,40,76,7,157,156,44,98,219,33,97,243,121,48,170,209,154,51,100], accounts[3], accounts[1], 96, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+446, accounts[9], 1338, 9, accounts[2], 257, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([153,29,222,4,223,33,44,86,72,174,236,255,156,197,40,76,7,157,156,44,98,219,33,97,243,121,48,170,209,154,51,100], accounts[3], accounts[1], 96, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 1338, 9, accounts[2], 257, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([58,32,131,119,12,102,131,150,145,122,84,46,112,52,54,42,73,174,212,121,98,225,9,127,107,183,246,255,101,89,23,28], accounts[4], accounts[1], 10000, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+9, accounts[7], 9, 96, accounts[3], 4038714810, 257,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([58,32,131,119,12,102,131,150,145,122,84,46,112,52,54,42,73,174,212,121,98,225,9,127,107,183,246,255,101,89,23,28], accounts[1], accounts[1], 10000, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+9, accounts[7], 9, 96, accounts[3], 4038714810, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([58,32,131,119,12,102,131,150,145,122,84,46,112,52,54,42,73,174,212,121,98,225,9,127,107,183,246,255,101,89,23,28], accounts[4], accounts[1], 0, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+9, accounts[7], 9, 96, accounts[3], 4038714810, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([58,32,131,119,12,102,131,150,145,122,84,46,112,52,54,42,73,174,212,121,98,225,9,127,107,183,246,255,101,89,23,28], accounts[4], accounts[1], 10000, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+9, accounts[7], 9, 96, accounts[3], 4038714810, 257,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([58,32,131,119,12,102,131,150,145,122,84,46,112,52,54,42,73,174,212,121,98,225,9,127,107,183,246,255,101,89,23,28], accounts[4], accounts[1], 10000, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 9, 96, accounts[3], 4038714810, 257,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([15,101,198,239,62,9,209,41,159,37,189,201,13,194,186,27,245,48,142,239,179,138,132,5,136,203,157,59,173,48,196,63], "0x0000000000000000000000000000000000000000", 2014223715,{from: accounts[0],value:2014223715});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([15,101,198,239,62,9,209,41,159,37,189,201,13,194,186,27,245,48,142,239,179,138,132,5,136,203,157,59,173,48,196,63], "0x0000000000000000000000000000000000000000", 2014223716,{from: accounts[0],value:2014223715}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([155,119,53,187,254,46,151,232,224,70,4,79,24,27,140,117,106,183,46,174,234,105,64,215,124,163,152,127,126,45,35,60], accounts[1], 0,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([163,146,213,122,188,37,122,30,57,52,138,197,236,4,89,67,154,91,226,204,6,90,246,236,177,220,109,219,84,29,10,55],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([201,189,217,24,87,30,236,40,234,58,200,249,40,160,54,156,55,101,90,182,140,4,140,103,49,130,133,89,92,4,120,167], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([187,75,87,150,218,90,213,246,27,110,65,138,31,246,65,48,172,199,88,61,243,55,102,218,63,147,193,90,221,193,240,234], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([6,113,206,156,181,100,2,112,153,229,175,188,164,179,163,136,181,126,132,170,54,74,110,138,13,93,126,70,193,100,44,176], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([128,242,199,51,108,2,76,144,105,226,79,183,40,205,221,241,139,223,212,135,18,80,109,204,37,141,24,181,47,124,224,59], accounts[9],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(26, 96,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(26, 96,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(26, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[8],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[1],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([32,181,216,68,36,254,52,214,234,80,58,133,174,182,77,22,202,0,232,52,50,158,90,209,153,244,99,56,142,86,146,164],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([206,176,187,147,56,207,230,56,113,208,9,4,183,202,34,115,121,20,39,201,186,178,181,213,108,12,196,243,226,252,140,137],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([160,158,35,37,92,95,233,24,111,97,45,119,123,218,40,96,26,111,30,81,181,38,73,218,62,155,176,68,108,219,111,228],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([107,59,116,17,156,248,214,201,150,212,161,233,58,109,16,242,161,242,161,10,174,72,35,7,22,20,195,10,134,110,61,69],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([86,91,210,37,180,80,199,152,111,64,7,223,184,48,227,158,75,109,5,6,214,20,37,146,51,232,208,253,239,13,10,31],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([113,103,8,204,118,128,78,236,32,132,95,245,119,225,246,157,168,210,192,181,177,231,200,222,246,1,141,104,70,119,170,66],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([157,0,143,115,254,231,117,195,180,123,151,14,187,168,62,21,119,237,18,228,77,38,95,188,85,229,127,51,180,97,128,230],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([150,48,107,167,190,100,139,72,181,147,10,124,126,209,111,239,75,134,121,97,115,43,48,229,95,184,227,62,70,194,81,102],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([239,252,245,121,123,123,252,130,65,145,72,5,10,41,125,239,110,213,176,205,241,147,76,10,151,208,164,233,0,229,107,24],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([173,108,122,187,36,106,209,68,40,212,85,106,102,135,140,99,20,190,241,162,134,113,2,16,212,221,73,206,41,78,53,113],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([137,212,16,99,204,115,81,161,62,123,18,125,173,130,145,167,61,130,106,159,201,133,80,58,71,8,3,170,180,69,111,198], accounts[9],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([238,146,196,32,177,117,125,169,174,231,17,166,11,245,189,235,111,68,14,213,116,251,60,150,1,20,201,52,28,52,113,180], accounts[0],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([18,35,101,234,232,28,58,160,255,103,62,111,213,57,29,31,165,22,135,65,234,98,224,110,206,25,213,220,22,235,191,12],{from: accounts[0]});
  });
});
