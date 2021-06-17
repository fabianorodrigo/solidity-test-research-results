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
    let result = await contractSwaps.tokenFallback(accounts[1], 9999, [95,111,241,182,170,196,34,56,125,81,172,70,99,0,195,73,157,232,115,110,5,204,149,20,121,71,216,233,184,89,135,155],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([97,98,205,137,100,170,138,62,230,3,251,89,3,229,69,231,66,183,241,218,13,227,76,22,12,140,131,67,55,234,213,71], accounts[1], accounts[9], 9999, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+974, accounts[6], 1337, 3, accounts[9], 28, 29,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([97,98,205,137,100,170,138,62,230,3,251,89,3,229,69,231,66,183,241,218,13,227,76,22,12,140,131,67,55,234,213,71], accounts[9], accounts[9], 9999, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+974, accounts[6], 1337, 3, accounts[9], 28, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([97,98,205,137,100,170,138,62,230,3,251,89,3,229,69,231,66,183,241,218,13,227,76,22,12,140,131,67,55,234,213,71], accounts[1], accounts[9], 0, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+974, accounts[6], 1337, 3, accounts[9], 28, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([97,98,205,137,100,170,138,62,230,3,251,89,3,229,69,231,66,183,241,218,13,227,76,22,12,140,131,67,55,234,213,71], accounts[1], accounts[9], 9999, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+974, accounts[6], 1337, 3, accounts[9], 28, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([97,98,205,137,100,170,138,62,230,3,251,89,3,229,69,231,66,183,241,218,13,227,76,22,12,140,131,67,55,234,213,71], accounts[1], accounts[9], 9999, 1336, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[6], 1337, 3, accounts[9], 28, 29,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([87,139,91,166,46,57,230,130,199,231,253,89,224,124,92,108,154,90,195,119,90,195,89,219,87,124,253,25,148,183,133,45], accounts[3], accounts[0], 255, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+173, accounts[9], 2014223716, 29, "0x0000000000000000000000000000000000000000", 255, 64,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([87,139,91,166,46,57,230,130,199,231,253,89,224,124,92,108,154,90,195,119,90,195,89,219,87,124,253,25,148,183,133,45], accounts[0], accounts[0], 255, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+173, accounts[9], 2014223716, 29, "0x0000000000000000000000000000000000000000", 255, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([87,139,91,166,46,57,230,130,199,231,253,89,224,124,92,108,154,90,195,119,90,195,89,219,87,124,253,25,148,183,133,45], accounts[3], accounts[0], 0, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+173, accounts[9], 2014223716, 29, "0x0000000000000000000000000000000000000000", 255, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([87,139,91,166,46,57,230,130,199,231,253,89,224,124,92,108,154,90,195,119,90,195,89,219,87,124,253,25,148,183,133,45], accounts[3], accounts[0], 255, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+173, accounts[9], 2014223716, 29, "0x0000000000000000000000000000000000000000", 255, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([87,139,91,166,46,57,230,130,199,231,253,89,224,124,92,108,154,90,195,119,90,195,89,219,87,124,253,25,148,183,133,45], accounts[3], accounts[0], 255, 3, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 2014223716, 29, "0x0000000000000000000000000000000000000000", 255, 64,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await contractSwaps.createOrder([140,35,41,205,232,68,208,117,239,32,154,75,173,223,181,134,15,83,81,149,92,221,81,165,156,171,73,144,192,248,28,244], accounts[4], accounts[7], 97, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+168, accounts[1], 97, 9999, accounts[2], 28, 4038714810,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([140,35,41,205,232,68,208,117,239,32,154,75,173,223,181,134,15,83,81,149,92,221,81,165,156,171,73,144,192,248,28,244], accounts[7], accounts[7], 97, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+168, accounts[1], 97, 9999, accounts[2], 28, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([140,35,41,205,232,68,208,117,239,32,154,75,173,223,181,134,15,83,81,149,92,221,81,165,156,171,73,144,192,248,28,244], accounts[4], accounts[7], 0, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+168, accounts[1], 97, 9999, accounts[2], 28, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([140,35,41,205,232,68,208,117,239,32,154,75,173,223,181,134,15,83,81,149,92,221,81,165,156,171,73,144,192,248,28,244], accounts[4], accounts[7], 97, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+168, accounts[1], 97, 9999, accounts[2], 28, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([140,35,41,205,232,68,208,117,239,32,154,75,173,223,181,134,15,83,81,149,92,221,81,165,156,171,73,144,192,248,28,244], accounts[4], accounts[7], 97, 4038714809, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 97, 9999, accounts[2], 28, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([171,131,177,221,196,133,126,129,164,5,149,15,253,138,90,15,26,166,45,120,221,65,37,66,209,165,234,202,184,143,6,17], accounts[6], accounts[8], 254, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[3], 4038714810, 2014223714, accounts[2], 29, 10001,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([171,131,177,221,196,133,126,129,164,5,149,15,253,138,90,15,26,166,45,120,221,65,37,66,209,165,234,202,184,143,6,17], accounts[8], accounts[8], 254, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[3], 4038714810, 2014223714, accounts[2], 29, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([171,131,177,221,196,133,126,129,164,5,149,15,253,138,90,15,26,166,45,120,221,65,37,66,209,165,234,202,184,143,6,17], accounts[6], accounts[8], 0, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[3], 4038714810, 2014223714, accounts[2], 29, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([171,131,177,221,196,133,126,129,164,5,149,15,253,138,90,15,26,166,45,120,221,65,37,66,209,165,234,202,184,143,6,17], accounts[6], accounts[8], 254, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+327, accounts[3], 4038714810, 2014223714, accounts[2], 29, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([171,131,177,221,196,133,126,129,164,5,149,15,253,138,90,15,26,166,45,120,221,65,37,66,209,165,234,202,184,143,6,17], accounts[6], accounts[8], 254, 5, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 4038714810, 2014223714, accounts[2], 29, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([49,127,223,64,30,156,220,254,114,65,87,70,13,110,195,83,8,24,168,55,174,57,54,17,71,94,102,18,22,150,225,86], "0x0000000000000000000000000000000000000000", 257,{from: accounts[0],value:257});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([49,127,223,64,30,156,220,254,114,65,87,70,13,110,195,83,8,24,168,55,174,57,54,17,71,94,102,18,22,150,225,86], "0x0000000000000000000000000000000000000000", 258,{from: accounts[0],value:257}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([65,174,250,9,92,82,106,130,203,66,122,1,92,20,26,63,175,34,239,37,224,133,3,215,101,92,147,151,220,222,101,132], accounts[9], 27,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([247,48,169,27,106,67,180,15,92,81,178,177,243,182,140,34,9,195,46,58,19,247,164,114,146,250,26,16,224,94,213,36],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([25,154,111,206,148,205,103,223,149,4,32,106,122,120,206,144,234,244,187,119,140,148,226,207,51,220,19,180,242,62,212,172], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([160,27,56,25,8,130,227,198,26,39,24,109,105,76,187,140,131,230,35,144,81,53,122,41,230,230,139,23,152,53,250,192], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([67,31,216,101,173,226,30,200,189,249,210,219,90,157,139,210,79,142,207,105,244,199,246,117,101,19,71,166,50,81,230,64], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([188,192,254,89,115,204,127,244,166,91,4,248,157,218,161,239,55,167,95,156,52,205,135,192,62,13,17,105,196,149,48,227], accounts[4],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(96, 95,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(96, 95,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 95,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(96, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[4],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[4],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[4],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([65,113,206,116,197,3,47,164,16,56,102,174,38,182,206,127,159,141,199,20,153,30,38,181,173,221,79,93,122,45,95,196],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([10,102,188,10,25,34,91,188,141,155,72,62,220,162,79,10,113,255,2,29,146,136,62,79,46,165,78,8,125,81,72,112],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([140,54,62,156,195,4,252,149,46,87,228,65,165,100,206,51,18,25,166,106,61,17,111,218,248,187,183,50,106,194,76,95],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([80,169,104,8,34,167,233,236,38,16,6,55,187,228,251,34,114,135,48,115,68,122,185,106,119,4,176,56,73,144,153,143],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([38,120,94,91,246,81,199,111,135,183,72,29,228,255,23,25,12,179,229,163,71,93,157,26,193,0,103,105,85,225,229,128],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([129,74,184,216,116,92,77,40,111,179,112,149,68,157,57,226,100,224,208,126,14,79,92,234,10,66,153,170,161,102,99,250],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([131,27,219,34,194,118,182,91,252,78,92,190,6,195,121,253,88,203,249,44,253,213,138,182,22,32,84,237,45,196,130,228],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([108,145,24,121,37,99,102,77,6,152,64,184,211,181,81,98,223,85,233,144,113,54,69,186,79,212,225,113,13,199,162,228],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([71,7,159,53,151,215,208,235,210,245,160,91,209,166,88,27,103,23,91,47,58,145,196,147,52,108,19,29,41,120,65,46],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([206,133,171,17,203,84,84,90,110,90,121,255,124,141,174,38,138,223,166,246,135,86,253,240,73,102,115,207,230,133,155,160],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([13,166,112,63,52,93,28,181,118,26,201,235,231,150,196,80,73,215,53,231,184,122,127,139,174,148,67,86,244,11,203,112], accounts[1],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([129,28,43,126,242,73,202,188,67,235,30,176,94,52,186,78,215,43,167,131,118,91,88,19,10,248,130,59,113,157,205,117], accounts[6],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([15,183,103,181,221,104,194,159,34,98,231,48,217,13,172,114,24,183,80,160,150,160,185,47,207,57,22,217,207,124,17,148],{from: accounts[0]});
  });
});
