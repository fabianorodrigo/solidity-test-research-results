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
    let result = await contractSwaps.tokenFallback(accounts[5], 96, [57,250,200,117,13,175,33,253,33,179,216,64,123,167,169,84,189,205,33,184,74,46,4,94,247,150,109,85,102,189,64,167],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([211,207,41,255,227,91,81,206,129,173,77,92,83,72,55,186,27,95,61,244,81,102,162,202,162,13,27,151,64,9,10,202], accounts[7], accounts[2], 10, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 2014223716, 1532892062, accounts[9], 2, 4038714811,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([211,207,41,255,227,91,81,206,129,173,77,92,83,72,55,186,27,95,61,244,81,102,162,202,162,13,27,151,64,9,10,202], accounts[2], accounts[2], 10, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 2014223716, 1532892062, accounts[9], 2, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([211,207,41,255,227,91,81,206,129,173,77,92,83,72,55,186,27,95,61,244,81,102,162,202,162,13,27,151,64,9,10,202], accounts[7], accounts[2], 0, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 2014223716, 1532892062, accounts[9], 2, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([211,207,41,255,227,91,81,206,129,173,77,92,83,72,55,186,27,95,61,244,81,102,162,202,162,13,27,151,64,9,10,202], accounts[7], accounts[2], 10, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648, accounts[5], 2014223716, 1532892062, accounts[9], 2, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([211,207,41,255,227,91,81,206,129,173,77,92,83,72,55,186,27,95,61,244,81,102,162,202,162,13,27,151,64,9,10,202], accounts[7], accounts[2], 10, 1338, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 2014223716, 1532892062, accounts[9], 2, 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([166,50,217,29,2,232,25,194,14,144,206,3,10,170,180,211,59,141,80,254,245,207,147,57,201,179,64,157,94,38,90,216], accounts[5], accounts[8], 2, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+150, accounts[2], 257, 4, "0x0000000000000000000000000000000000000000", 1532892062, 65,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([166,50,217,29,2,232,25,194,14,144,206,3,10,170,180,211,59,141,80,254,245,207,147,57,201,179,64,157,94,38,90,216], accounts[8], accounts[8], 2, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+150, accounts[2], 257, 4, "0x0000000000000000000000000000000000000000", 1532892062, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([166,50,217,29,2,232,25,194,14,144,206,3,10,170,180,211,59,141,80,254,245,207,147,57,201,179,64,157,94,38,90,216], accounts[5], accounts[8], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+150, accounts[2], 257, 4, "0x0000000000000000000000000000000000000000", 1532892062, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([166,50,217,29,2,232,25,194,14,144,206,3,10,170,180,211,59,141,80,254,245,207,147,57,201,179,64,157,94,38,90,216], accounts[5], accounts[8], 2, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+150, accounts[2], 257, 4, "0x0000000000000000000000000000000000000000", 1532892062, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([166,50,217,29,2,232,25,194,14,144,206,3,10,170,180,211,59,141,80,254,245,207,147,57,201,179,64,157,94,38,90,216], accounts[5], accounts[8], 2, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 257, 4, "0x0000000000000000000000000000000000000000", 1532892062, 65,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await contractSwaps.createOrder([170,94,214,243,229,184,74,231,221,70,33,87,195,75,191,236,147,224,42,108,107,212,109,203,205,65,223,128,191,167,109,112], accounts[6], accounts[2], 1532892062, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+371, accounts[6], 4038714810, 255, accounts[6], 255, 2014223716,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,94,214,243,229,184,74,231,221,70,33,87,195,75,191,236,147,224,42,108,107,212,109,203,205,65,223,128,191,167,109,112], accounts[2], accounts[2], 1532892062, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+371, accounts[6], 4038714810, 255, accounts[6], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,94,214,243,229,184,74,231,221,70,33,87,195,75,191,236,147,224,42,108,107,212,109,203,205,65,223,128,191,167,109,112], accounts[6], accounts[2], 0, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+371, accounts[6], 4038714810, 255, accounts[6], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,94,214,243,229,184,74,231,221,70,33,87,195,75,191,236,147,224,42,108,107,212,109,203,205,65,223,128,191,167,109,112], accounts[6], accounts[2], 1532892062, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+371, accounts[6], 4038714810, 255, accounts[6], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([170,94,214,243,229,184,74,231,221,70,33,87,195,75,191,236,147,224,42,108,107,212,109,203,205,65,223,128,191,167,109,112], accounts[6], accounts[2], 1532892062, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 4038714810, 255, accounts[6], 255, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([107,188,56,101,109,184,243,58,162,153,117,116,182,176,137,78,30,178,238,76,46,221,144,211,219,159,224,211,136,179,205,144], accounts[7], accounts[5], 2014223716, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 4038714809, 4038714809, accounts[4], 9999, 6,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([107,188,56,101,109,184,243,58,162,153,117,116,182,176,137,78,30,178,238,76,46,221,144,211,219,159,224,211,136,179,205,144], accounts[5], accounts[5], 2014223716, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 4038714809, 4038714809, accounts[4], 9999, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([107,188,56,101,109,184,243,58,162,153,117,116,182,176,137,78,30,178,238,76,46,221,144,211,219,159,224,211,136,179,205,144], accounts[7], accounts[5], 0, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 4038714809, 4038714809, accounts[4], 9999, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([107,188,56,101,109,184,243,58,162,153,117,116,182,176,137,78,30,178,238,76,46,221,144,211,219,159,224,211,136,179,205,144], accounts[7], accounts[5], 2014223716, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+905, accounts[0], 4038714809, 4038714809, accounts[4], 9999, 6,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([107,188,56,101,109,184,243,58,162,153,117,116,182,176,137,78,30,178,238,76,46,221,144,211,219,159,224,211,136,179,205,144], accounts[7], accounts[5], 2014223716, 9, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 4038714809, 4038714809, accounts[4], 9999, 6,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([149,110,76,200,33,228,213,22,33,169,173,1,56,108,78,252,88,116,172,208,6,220,31,58,77,217,236,192,233,89,243,120], "0x0000000000000000000000000000000000000000", 64,{from: accounts[0],value:64});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([149,110,76,200,33,228,213,22,33,169,173,1,56,108,78,252,88,116,172,208,6,220,31,58,77,217,236,192,233,89,243,120], "0x0000000000000000000000000000000000000000", 65,{from: accounts[0],value:64}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([97,100,133,223,214,112,94,17,56,191,130,204,47,241,130,136,126,96,13,160,219,1,152,132,162,0,66,253,3,205,161,150], accounts[4], 1336,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([163,108,185,19,164,36,139,142,152,200,10,23,249,116,216,105,86,137,160,197,183,26,168,18,227,200,48,77,164,182,125,5],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([184,226,142,33,214,122,226,19,79,199,251,183,63,139,155,100,147,139,249,4,161,87,72,82,238,128,93,119,200,57,199,215], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([217,45,109,134,253,121,190,113,251,215,103,147,144,35,0,5,235,181,157,48,107,185,174,64,35,113,161,91,16,131,221,183], accounts[8],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([192,245,232,109,207,219,74,166,143,118,162,237,22,150,229,133,195,15,123,250,119,186,0,164,238,55,71,10,16,217,212,100], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([238,208,108,165,79,214,167,47,208,170,46,139,9,37,9,80,68,235,225,13,129,16,16,149,119,247,14,131,35,42,68,155], accounts[2],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(255, 65,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(255, 65,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 65,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(255, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[1],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[7],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([105,200,72,142,14,78,116,26,249,198,104,199,63,219,154,89,111,134,76,174,182,32,198,179,66,142,124,184,157,118,65,27],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([37,15,88,124,236,177,227,132,129,62,133,186,186,119,1,83,123,93,12,111,123,63,75,93,79,152,5,55,92,119,14,48],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([36,252,83,12,12,141,224,127,234,125,123,97,165,4,238,212,117,29,246,228,6,32,86,125,126,103,192,53,3,51,40,222],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([33,194,209,110,19,122,68,30,212,48,74,186,85,207,109,71,121,245,208,97,74,188,53,112,91,135,81,248,50,221,239,242],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([235,140,90,172,248,152,136,16,222,140,160,142,121,191,140,139,25,58,245,192,82,81,160,42,79,102,113,194,174,163,170,162],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([58,159,87,29,223,136,180,251,137,246,202,22,211,50,27,106,119,44,226,120,137,239,232,0,143,146,107,121,243,14,59,32],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([2,22,217,235,66,200,121,184,161,214,40,27,154,56,121,237,228,225,94,234,131,177,124,44,181,39,12,11,33,0,104,55],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([172,106,118,11,52,108,151,37,26,1,105,41,2,216,75,214,100,38,8,19,197,0,124,208,229,241,85,12,37,0,154,199],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([82,85,132,26,112,142,70,223,190,142,146,99,50,240,1,125,234,94,168,82,4,171,152,22,108,104,163,191,117,36,20,183],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([248,247,93,65,9,72,228,41,165,56,222,41,217,96,57,123,207,242,183,232,136,19,83,188,72,6,22,31,87,51,233,200],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([92,69,204,251,187,77,186,221,73,153,116,158,86,73,27,77,173,153,144,115,39,25,111,207,137,70,162,30,183,168,222,173], accounts[1],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([221,39,47,147,103,6,71,27,18,234,31,71,0,18,52,98,127,175,13,198,198,70,155,40,205,37,216,236,216,6,182,77], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([165,103,208,233,93,63,189,108,160,130,87,181,186,230,105,160,97,53,62,173,95,65,44,143,252,232,126,196,36,203,86,200],{from: accounts[0]});
  });
});
