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
    let result = await contractSwaps.tokenFallback(accounts[5], 64, [228,92,61,9,115,179,216,75,51,2,134,119,255,136,5,127,60,110,159,62,160,25,119,231,69,98,81,37,64,201,44,226],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([78,34,69,140,32,68,57,203,153,29,209,232,232,239,60,100,187,107,182,139,167,29,138,99,206,241,27,81,148,50,98,158], accounts[8], accounts[1], 27, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+92, accounts[3], 27, 29, accounts[2], 5, 4038714810,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([78,34,69,140,32,68,57,203,153,29,209,232,232,239,60,100,187,107,182,139,167,29,138,99,206,241,27,81,148,50,98,158], accounts[1], accounts[1], 27, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+92, accounts[3], 27, 29, accounts[2], 5, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([78,34,69,140,32,68,57,203,153,29,209,232,232,239,60,100,187,107,182,139,167,29,138,99,206,241,27,81,148,50,98,158], accounts[8], accounts[1], 0, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+92, accounts[3], 27, 29, accounts[2], 5, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([78,34,69,140,32,68,57,203,153,29,209,232,232,239,60,100,187,107,182,139,167,29,138,99,206,241,27,81,148,50,98,158], accounts[8], accounts[1], 27, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+92, accounts[3], 27, 29, accounts[2], 5, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([78,34,69,140,32,68,57,203,153,29,209,232,232,239,60,100,187,107,182,139,167,29,138,99,206,241,27,81,148,50,98,158], accounts[8], accounts[1], 27, 10001, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[3], 27, 29, accounts[2], 5, 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([80,210,36,115,183,85,174,220,42,217,108,248,87,200,21,216,221,42,121,9,246,11,19,12,151,215,148,118,81,28,219,192], accounts[5], accounts[0], 1532892064, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+440, accounts[1], 1338, 2014223716, "0x0000000000000000000000000000000000000000", 6, 0,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([80,210,36,115,183,85,174,220,42,217,108,248,87,200,21,216,221,42,121,9,246,11,19,12,151,215,148,118,81,28,219,192], accounts[0], accounts[0], 1532892064, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+440, accounts[1], 1338, 2014223716, "0x0000000000000000000000000000000000000000", 6, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([80,210,36,115,183,85,174,220,42,217,108,248,87,200,21,216,221,42,121,9,246,11,19,12,151,215,148,118,81,28,219,192], accounts[5], accounts[0], 0, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+440, accounts[1], 1338, 2014223716, "0x0000000000000000000000000000000000000000", 6, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([80,210,36,115,183,85,174,220,42,217,108,248,87,200,21,216,221,42,121,9,246,11,19,12,151,215,148,118,81,28,219,192], accounts[5], accounts[0], 1532892064, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+440, accounts[1], 1338, 2014223716, "0x0000000000000000000000000000000000000000", 6, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([80,210,36,115,183,85,174,220,42,217,108,248,87,200,21,216,221,42,121,9,246,11,19,12,151,215,148,118,81,28,219,192], accounts[5], accounts[0], 1532892064, 2014223715, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 1338, 2014223716, "0x0000000000000000000000000000000000000000", 6, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await contractSwaps.createOrder([158,102,18,244,87,181,66,168,245,122,100,178,101,51,38,176,231,161,241,150,66,26,214,45,172,213,66,75,221,217,237,42], accounts[0], accounts[6], 28, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+889, accounts[2], 254, 1532892064, accounts[6], 97, 11,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([158,102,18,244,87,181,66,168,245,122,100,178,101,51,38,176,231,161,241,150,66,26,214,45,172,213,66,75,221,217,237,42], accounts[6], accounts[6], 28, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+889, accounts[2], 254, 1532892064, accounts[6], 97, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([158,102,18,244,87,181,66,168,245,122,100,178,101,51,38,176,231,161,241,150,66,26,214,45,172,213,66,75,221,217,237,42], accounts[0], accounts[6], 0, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+889, accounts[2], 254, 1532892064, accounts[6], 97, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([158,102,18,244,87,181,66,168,245,122,100,178,101,51,38,176,231,161,241,150,66,26,214,45,172,213,66,75,221,217,237,42], accounts[0], accounts[6], 28, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+889, accounts[2], 254, 1532892064, accounts[6], 97, 11,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([158,102,18,244,87,181,66,168,245,122,100,178,101,51,38,176,231,161,241,150,66,26,214,45,172,213,66,75,221,217,237,42], accounts[0], accounts[6], 28, 1, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 254, 1532892064, accounts[6], 97, 11,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([22,61,75,153,27,219,173,122,0,41,142,238,4,223,194,98,223,146,78,1,182,133,204,4,45,248,20,162,15,45,226,234], accounts[5], accounts[3], 2014223714, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+42, accounts[2], 256, 2014223714, accounts[3], 26, 4,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,61,75,153,27,219,173,122,0,41,142,238,4,223,194,98,223,146,78,1,182,133,204,4,45,248,20,162,15,45,226,234], accounts[3], accounts[3], 2014223714, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+42, accounts[2], 256, 2014223714, accounts[3], 26, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,61,75,153,27,219,173,122,0,41,142,238,4,223,194,98,223,146,78,1,182,133,204,4,45,248,20,162,15,45,226,234], accounts[5], accounts[3], 0, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+42, accounts[2], 256, 2014223714, accounts[3], 26, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,61,75,153,27,219,173,122,0,41,142,238,4,223,194,98,223,146,78,1,182,133,204,4,45,248,20,162,15,45,226,234], accounts[5], accounts[3], 2014223714, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+42, accounts[2], 256, 2014223714, accounts[3], 26, 4,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([22,61,75,153,27,219,173,122,0,41,142,238,4,223,194,98,223,146,78,1,182,133,204,4,45,248,20,162,15,45,226,234], accounts[5], accounts[3], 2014223714, 97, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 256, 2014223714, accounts[3], 26, 4,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([67,88,49,0,89,112,4,85,211,178,227,87,37,86,65,153,157,68,76,168,97,45,75,151,93,215,102,179,25,130,235,185], "0x0000000000000000000000000000000000000000", 4038714810,{from: accounts[0],value:4038714810});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([67,88,49,0,89,112,4,85,211,178,227,87,37,86,65,153,157,68,76,168,97,45,75,151,93,215,102,179,25,130,235,185], "0x0000000000000000000000000000000000000000", 4038714811,{from: accounts[0],value:4038714810}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([155,249,202,179,251,111,69,185,177,58,206,142,43,94,48,174,203,88,222,77,242,236,216,27,134,187,214,164,12,129,136,221], accounts[3], 3,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([228,45,133,169,115,22,252,178,100,255,234,17,31,37,101,15,226,213,124,145,190,91,4,51,40,83,99,247,130,116,186,107],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([111,64,143,196,96,220,54,136,208,54,118,3,217,56,237,61,237,20,42,48,114,186,60,253,114,218,143,119,43,182,244,158], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([110,182,64,214,149,92,234,78,144,56,239,68,169,161,111,251,185,23,238,48,126,57,82,158,135,7,92,190,119,191,117,24], accounts[9],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([34,99,207,65,253,238,212,65,157,160,250,64,242,127,177,191,143,29,180,189,120,102,121,223,28,108,246,122,232,145,116,58], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([248,1,146,246,32,179,165,93,236,84,225,47,142,46,108,112,184,128,147,68,35,72,230,209,107,235,216,245,226,94,42,3], accounts[5],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(66, 9,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(66, 9,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 9,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(66, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[6],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[1],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([28,232,110,38,192,23,140,37,151,180,211,83,112,92,8,203,85,218,71,153,165,22,110,64,122,237,6,235,30,126,70,3],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([141,132,0,12,71,104,215,154,16,18,26,18,206,5,153,225,10,32,81,14,109,202,142,56,74,127,7,35,115,221,22,55],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([170,234,143,201,45,31,252,143,183,209,34,126,1,177,41,169,230,82,113,117,59,122,156,59,216,73,192,152,128,203,37,159],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([235,239,10,22,191,125,205,176,212,168,44,121,135,31,129,186,72,163,197,61,247,125,170,253,10,121,161,200,242,192,142,140],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([250,237,51,19,16,157,109,234,147,181,249,6,160,247,97,159,200,193,244,67,102,217,44,194,66,80,58,0,27,200,103,227],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([96,35,138,143,17,106,21,147,199,249,120,18,93,91,37,46,246,149,113,15,131,58,34,70,118,126,250,249,32,180,107,210],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([228,112,166,51,130,228,71,108,128,238,43,118,106,124,112,188,134,17,14,4,244,158,237,8,49,187,32,195,118,228,60,113],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([197,203,46,210,61,159,165,22,98,178,104,191,176,160,143,8,76,135,124,98,198,189,118,75,43,204,252,51,30,103,189,240],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([13,8,136,202,126,105,25,13,244,28,205,226,186,19,185,147,241,61,89,97,113,223,66,91,46,142,124,235,99,59,107,252],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([219,41,234,245,237,168,247,96,229,14,218,24,36,183,232,28,250,115,223,87,253,46,235,123,58,141,136,116,174,139,211,169],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([217,149,7,160,67,80,47,12,125,40,187,239,160,208,91,38,130,114,50,36,107,143,99,9,221,135,97,108,71,87,194,224], accounts[3],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([24,192,115,81,239,146,229,173,100,232,17,169,137,138,21,252,235,198,246,213,19,94,94,133,125,253,250,4,7,19,33,154], accounts[1],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([90,127,214,166,99,150,138,29,41,135,237,8,144,214,223,187,105,33,105,83,101,227,65,236,9,208,50,90,23,212,240,88],{from: accounts[0]});
  });
});
