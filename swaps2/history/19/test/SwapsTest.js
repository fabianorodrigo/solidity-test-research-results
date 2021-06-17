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
    let result = await contractSwaps.tokenFallback(accounts[4], 9999, [153,45,25,203,189,46,116,218,114,203,27,137,143,226,16,83,93,210,237,242,248,217,15,162,185,142,14,141,172,92,48,144],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([22,1,17,34,93,49,228,6,211,124,186,22,36,208,118,171,104,81,28,156,125,43,22,47,162,122,217,91,217,0,255,126], accounts[4], accounts[9], 2014223716, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+403, accounts[2], 254, 254, accounts[0], 10000, 2014223715,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,1,17,34,93,49,228,6,211,124,186,22,36,208,118,171,104,81,28,156,125,43,22,47,162,122,217,91,217,0,255,126], accounts[9], accounts[9], 2014223716, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+403, accounts[2], 254, 254, accounts[0], 10000, 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,1,17,34,93,49,228,6,211,124,186,22,36,208,118,171,104,81,28,156,125,43,22,47,162,122,217,91,217,0,255,126], accounts[4], accounts[9], 0, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+403, accounts[2], 254, 254, accounts[0], 10000, 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,1,17,34,93,49,228,6,211,124,186,22,36,208,118,171,104,81,28,156,125,43,22,47,162,122,217,91,217,0,255,126], accounts[4], accounts[9], 2014223716, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+403, accounts[2], 254, 254, accounts[0], 10000, 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,1,17,34,93,49,228,6,211,124,186,22,36,208,118,171,104,81,28,156,125,43,22,47,162,122,217,91,217,0,255,126], accounts[4], accounts[9], 2014223716, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 254, 254, accounts[0], 10000, 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([63,197,209,255,17,50,223,187,73,15,24,217,146,96,215,86,126,231,230,226,202,134,51,220,181,13,11,164,196,200,74,28], accounts[5], accounts[9], 10001, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+61, accounts[3], 1338, 1532892062, "0x0000000000000000000000000000000000000000", 2014223715, 2014223714,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,197,209,255,17,50,223,187,73,15,24,217,146,96,215,86,126,231,230,226,202,134,51,220,181,13,11,164,196,200,74,28], accounts[9], accounts[9], 10001, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+61, accounts[3], 1338, 1532892062, "0x0000000000000000000000000000000000000000", 2014223715, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,197,209,255,17,50,223,187,73,15,24,217,146,96,215,86,126,231,230,226,202,134,51,220,181,13,11,164,196,200,74,28], accounts[5], accounts[9], 0, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+61, accounts[3], 1338, 1532892062, "0x0000000000000000000000000000000000000000", 2014223715, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,197,209,255,17,50,223,187,73,15,24,217,146,96,215,86,126,231,230,226,202,134,51,220,181,13,11,164,196,200,74,28], accounts[5], accounts[9], 10001, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+61, accounts[3], 1338, 1532892062, "0x0000000000000000000000000000000000000000", 2014223715, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([63,197,209,255,17,50,223,187,73,15,24,217,146,96,215,86,126,231,230,226,202,134,51,220,181,13,11,164,196,200,74,28], accounts[5], accounts[9], 10001, 1532892062, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 1338, 1532892062, "0x0000000000000000000000000000000000000000", 2014223715, 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await contractSwaps.createOrder([192,221,78,251,106,149,203,228,185,247,98,32,244,162,175,4,143,126,110,27,222,99,227,68,206,88,88,186,32,48,165,177], accounts[6], accounts[7], 9, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 66, 97, accounts[4], 3, 27,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([192,221,78,251,106,149,203,228,185,247,98,32,244,162,175,4,143,126,110,27,222,99,227,68,206,88,88,186,32,48,165,177], accounts[7], accounts[7], 9, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 66, 97, accounts[4], 3, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([192,221,78,251,106,149,203,228,185,247,98,32,244,162,175,4,143,126,110,27,222,99,227,68,206,88,88,186,32,48,165,177], accounts[6], accounts[7], 0, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 66, 97, accounts[4], 3, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([192,221,78,251,106,149,203,228,185,247,98,32,244,162,175,4,143,126,110,27,222,99,227,68,206,88,88,186,32,48,165,177], accounts[6], accounts[7], 9, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+242, accounts[8], 66, 97, accounts[4], 3, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([192,221,78,251,106,149,203,228,185,247,98,32,244,162,175,4,143,126,110,27,222,99,227,68,206,88,88,186,32,48,165,177], accounts[6], accounts[7], 9, 4, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 66, 97, accounts[4], 3, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([14,147,224,221,7,33,223,128,109,8,200,138,79,17,142,154,232,0,14,116,207,146,248,125,117,43,74,27,129,201,153,32], accounts[5], accounts[0], 4, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+562, accounts[8], 254, 11, accounts[0], 1336, 256,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([14,147,224,221,7,33,223,128,109,8,200,138,79,17,142,154,232,0,14,116,207,146,248,125,117,43,74,27,129,201,153,32], accounts[0], accounts[0], 4, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+562, accounts[8], 254, 11, accounts[0], 1336, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([14,147,224,221,7,33,223,128,109,8,200,138,79,17,142,154,232,0,14,116,207,146,248,125,117,43,74,27,129,201,153,32], accounts[5], accounts[0], 0, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+562, accounts[8], 254, 11, accounts[0], 1336, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([14,147,224,221,7,33,223,128,109,8,200,138,79,17,142,154,232,0,14,116,207,146,248,125,117,43,74,27,129,201,153,32], accounts[5], accounts[0], 4, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+562, accounts[8], 254, 11, accounts[0], 1336, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([14,147,224,221,7,33,223,128,109,8,200,138,79,17,142,154,232,0,14,116,207,146,248,125,117,43,74,27,129,201,153,32], accounts[5], accounts[0], 4, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[8], 254, 11, accounts[0], 1336, 256,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([5,191,41,229,86,150,2,11,159,15,31,184,238,46,93,58,91,197,31,49,134,138,107,254,165,233,220,232,219,35,255,253], "0x0000000000000000000000000000000000000000", 6,{from: accounts[0],value:6});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([5,191,41,229,86,150,2,11,159,15,31,184,238,46,93,58,91,197,31,49,134,138,107,254,165,233,220,232,219,35,255,253], "0x0000000000000000000000000000000000000000", 7,{from: accounts[0],value:6}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([18,179,60,116,242,197,27,34,238,132,175,38,127,127,249,98,39,234,94,176,154,88,70,196,96,55,9,225,212,7,133,15], accounts[1], 4038714811,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([45,1,39,198,3,3,200,22,187,158,43,32,147,58,97,39,28,87,254,168,179,3,52,3,219,23,88,49,4,123,188,45],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([18,69,221,161,59,10,225,228,87,233,62,30,243,167,15,177,109,133,235,72,194,217,96,154,149,217,146,201,89,217,174,95], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([205,122,200,11,97,67,176,155,89,119,216,161,83,10,187,57,232,12,213,165,223,68,23,42,211,194,0,37,131,222,11,131], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([95,34,15,141,180,213,123,127,161,57,17,2,75,130,85,183,233,70,29,242,61,84,42,105,216,203,175,41,90,160,162,82], accounts[4],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([148,114,136,14,142,190,85,163,254,27,132,109,175,160,146,19,37,143,14,133,11,54,156,187,72,163,246,222,102,236,22,25], accounts[3],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(27, 26,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(27, 26,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 26,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(27, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[7],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[7],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([75,97,43,93,51,118,157,153,51,238,130,168,49,69,39,184,194,246,10,33,243,161,185,250,237,222,55,194,125,21,202,76],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([67,136,187,223,3,214,101,129,217,194,8,87,105,23,235,227,126,211,23,122,25,204,89,144,30,102,219,168,118,68,67,40],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([66,5,143,213,184,124,65,100,226,187,25,14,118,212,207,247,20,81,13,108,80,178,190,225,170,27,251,212,111,162,145,63],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([136,189,76,117,215,186,49,6,44,2,96,143,172,48,126,252,63,198,228,205,22,29,9,87,139,0,27,93,210,129,174,93],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([169,55,98,184,106,54,139,152,225,213,212,42,195,146,40,152,230,234,51,93,235,11,35,163,5,244,2,38,1,231,121,148],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([120,30,235,173,82,90,195,34,58,227,107,1,17,127,17,90,239,95,136,21,40,150,68,233,200,247,219,53,47,78,77,98],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([186,61,116,103,1,57,232,228,81,175,35,177,36,179,163,5,22,74,169,13,63,241,124,98,75,210,22,38,154,229,27,191],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([242,79,9,63,231,40,158,107,49,38,222,228,187,93,32,78,84,251,130,61,183,122,88,140,84,172,200,247,18,245,240,242],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([249,1,120,211,108,78,131,196,138,154,43,156,139,216,167,229,161,5,226,56,50,23,213,8,97,125,48,147,173,99,189,37],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([146,201,212,120,197,210,194,73,120,174,61,122,136,226,179,14,103,182,196,48,161,80,83,46,17,104,54,226,85,134,35,249],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([218,108,65,117,210,158,169,234,64,52,80,141,119,1,208,254,251,182,214,222,107,72,1,145,137,69,234,228,46,82,118,87], accounts[3],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([98,7,234,79,61,228,44,208,86,93,210,52,48,61,134,11,197,227,25,6,106,210,95,125,131,248,206,248,241,92,89,28], accounts[9],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([212,125,104,4,83,248,63,99,174,92,220,238,223,141,101,239,131,211,108,62,169,77,99,118,228,91,50,120,246,248,49,241],{from: accounts[0]});
  });
});
