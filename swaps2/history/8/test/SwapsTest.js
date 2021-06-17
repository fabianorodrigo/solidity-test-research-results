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
    let result = await contractSwaps.tokenFallback(accounts[0], 10000, [221,227,243,47,85,62,190,229,242,9,163,217,118,201,164,121,33,126,97,70,59,93,43,137,32,217,120,28,137,254,167,195],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([30,39,139,154,43,0,163,15,57,83,62,237,95,181,2,141,40,112,25,239,234,1,9,198,119,5,248,62,214,107,78,106], accounts[8], accounts[9], 255, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+555, accounts[9], 255, 9, accounts[5], 10000, 10001,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,39,139,154,43,0,163,15,57,83,62,237,95,181,2,141,40,112,25,239,234,1,9,198,119,5,248,62,214,107,78,106], accounts[9], accounts[9], 255, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+555, accounts[9], 255, 9, accounts[5], 10000, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,39,139,154,43,0,163,15,57,83,62,237,95,181,2,141,40,112,25,239,234,1,9,198,119,5,248,62,214,107,78,106], accounts[8], accounts[9], 0, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+555, accounts[9], 255, 9, accounts[5], 10000, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,39,139,154,43,0,163,15,57,83,62,237,95,181,2,141,40,112,25,239,234,1,9,198,119,5,248,62,214,107,78,106], accounts[8], accounts[9], 255, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+555, accounts[9], 255, 9, accounts[5], 10000, 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([30,39,139,154,43,0,163,15,57,83,62,237,95,181,2,141,40,112,25,239,234,1,9,198,119,5,248,62,214,107,78,106], accounts[8], accounts[9], 255, 66, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 255, 9, accounts[5], 10000, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([41,29,229,152,12,131,92,151,63,152,13,0,45,65,81,106,212,156,167,23,57,7,220,141,22,81,156,193,60,108,8,223], accounts[8], accounts[4], 257, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+2, accounts[3], 10000, 27, "0x0000000000000000000000000000000000000000", 2, 10,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,29,229,152,12,131,92,151,63,152,13,0,45,65,81,106,212,156,167,23,57,7,220,141,22,81,156,193,60,108,8,223], accounts[4], accounts[4], 257, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+2, accounts[3], 10000, 27, "0x0000000000000000000000000000000000000000", 2, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,29,229,152,12,131,92,151,63,152,13,0,45,65,81,106,212,156,167,23,57,7,220,141,22,81,156,193,60,108,8,223], accounts[8], accounts[4], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+2, accounts[3], 10000, 27, "0x0000000000000000000000000000000000000000", 2, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,29,229,152,12,131,92,151,63,152,13,0,45,65,81,106,212,156,167,23,57,7,220,141,22,81,156,193,60,108,8,223], accounts[8], accounts[4], 257, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+2, accounts[3], 10000, 27, "0x0000000000000000000000000000000000000000", 2, 10,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([41,29,229,152,12,131,92,151,63,152,13,0,45,65,81,106,212,156,167,23,57,7,220,141,22,81,156,193,60,108,8,223], accounts[8], accounts[4], 257, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 10000, 27, "0x0000000000000000000000000000000000000000", 2, 10,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await contractSwaps.createOrder([110,41,45,148,177,30,203,214,213,223,117,133,168,65,174,109,201,139,24,142,36,19,183,47,27,131,67,112,20,27,71,200], accounts[5], accounts[6], 96, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+95, accounts[9], 10, 2014223716, accounts[9], 2, 5,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([110,41,45,148,177,30,203,214,213,223,117,133,168,65,174,109,201,139,24,142,36,19,183,47,27,131,67,112,20,27,71,200], accounts[6], accounts[6], 96, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+95, accounts[9], 10, 2014223716, accounts[9], 2, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([110,41,45,148,177,30,203,214,213,223,117,133,168,65,174,109,201,139,24,142,36,19,183,47,27,131,67,112,20,27,71,200], accounts[5], accounts[6], 0, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+95, accounts[9], 10, 2014223716, accounts[9], 2, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([110,41,45,148,177,30,203,214,213,223,117,133,168,65,174,109,201,139,24,142,36,19,183,47,27,131,67,112,20,27,71,200], accounts[5], accounts[6], 96, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+95, accounts[9], 10, 2014223716, accounts[9], 2, 5,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([110,41,45,148,177,30,203,214,213,223,117,133,168,65,174,109,201,139,24,142,36,19,183,47,27,131,67,112,20,27,71,200], accounts[5], accounts[6], 96, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 10, 2014223716, accounts[9], 2, 5,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([159,170,89,127,57,15,143,29,48,173,72,254,7,34,37,200,229,99,130,230,189,150,102,20,26,27,37,165,218,166,130,142], accounts[0], accounts[1], 6, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+14, accounts[9], 2014223714, 96, accounts[7], 96, 1337,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,170,89,127,57,15,143,29,48,173,72,254,7,34,37,200,229,99,130,230,189,150,102,20,26,27,37,165,218,166,130,142], accounts[1], accounts[1], 6, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+14, accounts[9], 2014223714, 96, accounts[7], 96, 1337,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,170,89,127,57,15,143,29,48,173,72,254,7,34,37,200,229,99,130,230,189,150,102,20,26,27,37,165,218,166,130,142], accounts[0], accounts[1], 0, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+14, accounts[9], 2014223714, 96, accounts[7], 96, 1337,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,170,89,127,57,15,143,29,48,173,72,254,7,34,37,200,229,99,130,230,189,150,102,20,26,27,37,165,218,166,130,142], accounts[0], accounts[1], 6, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+14, accounts[9], 2014223714, 96, accounts[7], 96, 1337,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([159,170,89,127,57,15,143,29,48,173,72,254,7,34,37,200,229,99,130,230,189,150,102,20,26,27,37,165,218,166,130,142], accounts[0], accounts[1], 6, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[9], 2014223714, 96, accounts[7], 96, 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([67,131,174,116,219,186,93,188,162,103,31,24,144,239,214,155,148,62,154,41,143,1,102,88,45,63,121,173,192,90,16,173], "0x0000000000000000000000000000000000000000", 28,{from: accounts[0],value:28});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([67,131,174,116,219,186,93,188,162,103,31,24,144,239,214,155,148,62,154,41,143,1,102,88,45,63,121,173,192,90,16,173], "0x0000000000000000000000000000000000000000", 29,{from: accounts[0],value:28}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([170,119,201,244,186,252,185,195,214,171,90,45,236,212,173,51,196,56,42,59,249,191,76,105,84,238,252,69,89,199,200,113], accounts[5], 65,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([9,250,97,107,22,35,81,118,145,198,18,237,61,84,83,190,132,249,98,67,241,20,213,68,22,95,172,104,4,5,194,179],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([70,156,195,20,128,248,232,165,233,201,108,147,189,226,134,57,56,89,223,217,197,63,9,15,128,75,59,108,130,236,221,64], accounts[0],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([37,235,241,170,156,32,107,32,43,20,144,27,150,193,80,108,254,208,3,225,250,241,122,213,165,22,73,39,155,205,219,125], accounts[6],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([75,94,87,51,14,228,220,93,91,216,23,98,79,4,233,130,40,148,181,99,188,212,247,126,154,46,197,169,77,48,168,111], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([19,128,47,48,148,140,201,23,179,159,61,17,168,237,241,71,75,34,118,76,225,243,32,249,215,34,68,193,69,220,132,251], accounts[5],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(3, 1336,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(3, 1336,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 1336,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(3, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[0],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[3],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([253,209,105,32,61,207,77,185,110,117,151,28,83,109,42,86,145,76,60,11,128,157,23,90,240,82,163,133,187,141,12,165],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([158,79,27,208,170,67,58,58,215,3,208,127,107,10,54,95,106,14,61,188,58,133,213,156,61,75,39,173,12,73,213,13],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([106,251,88,238,133,110,174,228,70,205,198,69,245,105,2,94,105,26,23,149,144,79,119,57,11,139,86,135,29,252,213,27],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([180,199,192,203,123,118,178,137,198,213,145,114,205,51,107,171,11,106,5,31,135,204,53,80,83,51,52,229,247,222,74,161],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([183,1,145,133,73,141,255,249,57,39,236,18,227,58,251,145,47,105,219,117,213,188,87,164,156,229,21,57,187,209,56,9],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([156,112,165,242,191,41,111,43,72,34,112,182,95,3,253,211,242,176,176,120,254,127,169,178,165,132,225,84,27,54,178,208],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([101,46,96,88,66,71,104,84,81,4,1,108,184,110,119,74,8,113,53,21,2,244,36,52,51,50,2,34,118,188,97,225],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([220,167,81,203,170,157,212,160,180,178,138,177,121,50,15,27,255,63,202,98,123,159,110,99,11,52,103,124,57,198,102,76],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([119,184,126,113,8,129,248,59,224,49,241,122,143,183,154,204,129,162,113,156,63,153,214,24,121,40,107,120,128,73,72,147],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([242,198,109,99,11,223,192,168,186,202,137,137,32,70,204,140,82,32,216,65,122,151,94,17,5,235,219,110,147,141,242,159],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([35,79,121,95,26,162,246,109,189,211,133,160,171,56,119,60,44,176,244,150,145,151,157,23,131,189,74,30,181,237,140,221], accounts[5],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([213,238,88,15,42,116,120,153,55,210,247,249,8,83,121,23,61,42,249,137,57,252,195,90,140,37,134,94,4,182,125,151], accounts[0],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([248,85,73,238,56,233,98,119,96,121,61,196,78,215,28,177,115,112,232,73,85,199,201,84,96,116,61,190,254,141,53,193],{from: accounts[0]});
  });
});
