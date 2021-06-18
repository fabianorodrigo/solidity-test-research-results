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
    let result = await contractSwaps.tokenFallback(accounts[8], 4, [68,178,148,155,30,148,117,155,103,203,160,50,188,55,212,107,206,102,70,129,98,208,11,37,208,115,66,205,221,96,24,123],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([159,40,85,223,213,185,169,98,100,28,138,235,36,180,224,182,223,48,199,83,215,149,143,60,177,193,31,17,240,100,87,76], accounts[1], accounts[0], 1, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+900, accounts[0], 4038714810, 255, accounts[2], 6, 29,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,40,85,223,213,185,169,98,100,28,138,235,36,180,224,182,223,48,199,83,215,149,143,60,177,193,31,17,240,100,87,76], accounts[0], accounts[0], 1, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+900, accounts[0], 4038714810, 255, accounts[2], 6, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,40,85,223,213,185,169,98,100,28,138,235,36,180,224,182,223,48,199,83,215,149,143,60,177,193,31,17,240,100,87,76], accounts[1], accounts[0], 0, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+900, accounts[0], 4038714810, 255, accounts[2], 6, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,40,85,223,213,185,169,98,100,28,138,235,36,180,224,182,223,48,199,83,215,149,143,60,177,193,31,17,240,100,87,76], accounts[1], accounts[0], 1, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+900, accounts[0], 4038714810, 255, accounts[2], 6, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,40,85,223,213,185,169,98,100,28,138,235,36,180,224,182,223,48,199,83,215,149,143,60,177,193,31,17,240,100,87,76], accounts[1], accounts[0], 1, 255, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[0], 4038714810, 255, accounts[2], 6, 29,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([51,91,161,254,193,246,4,47,5,190,11,92,79,31,112,96,161,114,74,6,112,205,44,163,153,227,247,57,177,16,7,36], accounts[4], accounts[5], 4038714810, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[7], 65, 29, "0x0000000000000000000000000000000000000000", 1532892063, 1336,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,91,161,254,193,246,4,47,5,190,11,92,79,31,112,96,161,114,74,6,112,205,44,163,153,227,247,57,177,16,7,36], accounts[5], accounts[5], 4038714810, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[7], 65, 29, "0x0000000000000000000000000000000000000000", 1532892063, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,91,161,254,193,246,4,47,5,190,11,92,79,31,112,96,161,114,74,6,112,205,44,163,153,227,247,57,177,16,7,36], accounts[4], accounts[5], 0, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[7], 65, 29, "0x0000000000000000000000000000000000000000", 1532892063, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,91,161,254,193,246,4,47,5,190,11,92,79,31,112,96,161,114,74,6,112,205,44,163,153,227,247,57,177,16,7,36], accounts[4], accounts[5], 4038714810, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+158, accounts[7], 65, 29, "0x0000000000000000000000000000000000000000", 1532892063, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([51,91,161,254,193,246,4,47,5,190,11,92,79,31,112,96,161,114,74,6,112,205,44,163,153,227,247,57,177,16,7,36], accounts[4], accounts[5], 4038714810, 65, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[7], 65, 29, "0x0000000000000000000000000000000000000000", 1532892063, 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await contractSwaps.createOrder([26,66,249,6,10,17,226,79,93,237,79,4,95,107,51,146,9,89,36,222,233,10,201,239,246,225,9,103,147,126,180,126], accounts[5], accounts[8], 2014223714, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+928, accounts[4], 28, 1336, accounts[9], 0, 2,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,66,249,6,10,17,226,79,93,237,79,4,95,107,51,146,9,89,36,222,233,10,201,239,246,225,9,103,147,126,180,126], accounts[8], accounts[8], 2014223714, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+928, accounts[4], 28, 1336, accounts[9], 0, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,66,249,6,10,17,226,79,93,237,79,4,95,107,51,146,9,89,36,222,233,10,201,239,246,225,9,103,147,126,180,126], accounts[5], accounts[8], 0, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+928, accounts[4], 28, 1336, accounts[9], 0, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,66,249,6,10,17,226,79,93,237,79,4,95,107,51,146,9,89,36,222,233,10,201,239,246,225,9,103,147,126,180,126], accounts[5], accounts[8], 2014223714, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+928, accounts[4], 28, 1336, accounts[9], 0, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([26,66,249,6,10,17,226,79,93,237,79,4,95,107,51,146,9,89,36,222,233,10,201,239,246,225,9,103,147,126,180,126], accounts[5], accounts[8], 2014223714, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[4], 28, 1336, accounts[9], 0, 2,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([183,40,70,254,101,103,201,248,184,82,219,29,253,246,103,209,192,149,209,50,49,23,240,70,206,22,122,136,189,145,45,18], accounts[5], accounts[6], 9999, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+189, accounts[1], 65, 1338, accounts[4], 66, 26,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([183,40,70,254,101,103,201,248,184,82,219,29,253,246,103,209,192,149,209,50,49,23,240,70,206,22,122,136,189,145,45,18], accounts[6], accounts[6], 9999, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+189, accounts[1], 65, 1338, accounts[4], 66, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([183,40,70,254,101,103,201,248,184,82,219,29,253,246,103,209,192,149,209,50,49,23,240,70,206,22,122,136,189,145,45,18], accounts[5], accounts[6], 0, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+189, accounts[1], 65, 1338, accounts[4], 66, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([183,40,70,254,101,103,201,248,184,82,219,29,253,246,103,209,192,149,209,50,49,23,240,70,206,22,122,136,189,145,45,18], accounts[5], accounts[6], 9999, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+189, accounts[1], 65, 1338, accounts[4], 66, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([183,40,70,254,101,103,201,248,184,82,219,29,253,246,103,209,192,149,209,50,49,23,240,70,206,22,122,136,189,145,45,18], accounts[5], accounts[6], 9999, 95, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 65, 1338, accounts[4], 66, 26,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([106,210,176,41,210,209,142,213,162,253,174,65,106,80,245,72,190,162,224,89,185,8,19,75,252,59,105,147,255,65,132,158], "0x0000000000000000000000000000000000000000", 2014223716,{from: accounts[0],value:2014223716});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([106,210,176,41,210,209,142,213,162,253,174,65,106,80,245,72,190,162,224,89,185,8,19,75,252,59,105,147,255,65,132,158], "0x0000000000000000000000000000000000000000", 2014223717,{from: accounts[0],value:2014223716}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([98,193,88,58,174,155,131,143,54,253,194,85,1,163,210,153,217,195,176,93,164,83,46,26,168,72,113,229,65,18,59,116], accounts[2], 4,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([197,156,25,81,62,65,85,79,5,170,160,8,179,187,16,26,6,200,79,195,18,195,14,92,175,130,153,64,109,7,159,93],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([239,110,243,12,1,203,164,163,172,103,113,87,197,182,150,203,55,126,35,181,191,95,51,197,30,244,13,29,181,233,215,57], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([26,100,183,191,41,46,143,228,19,240,43,27,203,137,3,253,46,202,136,105,222,47,141,147,173,21,78,86,180,80,240,82], accounts[4],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([141,4,127,188,167,163,52,79,58,154,66,20,218,119,75,65,78,37,202,45,129,9,126,85,119,181,169,243,253,62,93,84], accounts[2],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([144,64,235,184,109,180,26,43,61,236,35,121,20,79,186,198,187,231,28,27,41,98,245,19,82,87,104,100,39,7,216,208], accounts[0],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(9, 28,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(9, 28,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(9, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[0],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[0],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([207,163,221,54,176,148,254,211,63,107,19,227,28,181,75,202,113,33,150,15,39,20,22,87,181,33,213,188,42,238,15,130],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([88,168,18,56,181,246,91,221,41,131,252,18,247,205,188,39,219,99,254,234,65,78,46,197,207,109,223,212,163,204,202,146],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([34,218,108,6,179,24,129,88,161,233,148,215,144,26,156,15,148,193,110,117,244,187,87,140,111,143,154,91,126,105,56,190],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([132,112,65,80,203,9,44,27,224,227,251,170,78,173,178,45,233,159,238,65,143,192,218,97,23,234,210,98,245,178,10,219],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([111,80,31,128,223,25,95,155,150,109,121,172,72,215,30,22,179,146,156,38,202,249,41,223,184,5,243,252,171,135,92,213],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([131,146,25,98,136,48,130,41,104,52,190,185,4,255,155,193,105,179,66,80,124,233,204,253,132,71,214,127,216,174,216,108],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([53,189,116,191,250,91,243,233,238,1,122,111,235,68,22,27,39,100,146,99,240,104,234,191,254,201,171,156,11,163,232,174],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([202,68,195,190,83,165,210,187,148,185,93,2,194,68,45,17,70,44,23,255,199,180,98,244,127,143,20,100,78,55,171,202],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([14,41,59,72,36,249,147,13,6,181,182,138,48,132,240,172,118,100,71,207,92,19,109,67,196,67,15,157,254,177,126,214],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([174,85,178,162,85,24,234,180,57,222,122,176,169,123,100,7,129,151,28,92,200,40,53,173,162,108,241,174,10,85,9,4],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([162,24,50,130,143,27,127,243,233,130,103,203,154,15,134,62,141,221,200,253,2,221,106,161,224,246,16,249,244,118,150,86], accounts[0],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([108,202,63,135,93,36,50,130,66,57,209,207,116,179,222,164,163,137,132,234,100,181,245,190,28,15,164,49,63,58,77,61], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([150,148,103,82,220,145,142,161,133,128,175,250,139,54,174,227,74,22,100,111,53,176,227,228,209,96,17,254,209,14,85,209],{from: accounts[0]});
  });
});
