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
    let result = await contractSwaps.tokenFallback(accounts[5], 1336, [128,12,237,31,219,194,130,198,35,52,253,192,129,164,210,120,172,22,179,199,42,1,246,206,2,255,195,236,50,60,139,69],{from: accounts[0]});
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([62,32,234,142,163,205,244,125,208,208,220,158,121,215,22,121,13,22,254,27,224,70,189,67,163,116,53,72,75,216,251,61], accounts[3], accounts[9], 4, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+374, accounts[1], 26, 10000, accounts[7], 6, 2,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([62,32,234,142,163,205,244,125,208,208,220,158,121,215,22,121,13,22,254,27,224,70,189,67,163,116,53,72,75,216,251,61], accounts[9], accounts[9], 4, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+374, accounts[1], 26, 10000, accounts[7], 6, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([62,32,234,142,163,205,244,125,208,208,220,158,121,215,22,121,13,22,254,27,224,70,189,67,163,116,53,72,75,216,251,61], accounts[3], accounts[9], 0, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+374, accounts[1], 26, 10000, accounts[7], 6, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([62,32,234,142,163,205,244,125,208,208,220,158,121,215,22,121,13,22,254,27,224,70,189,67,163,116,53,72,75,216,251,61], accounts[3], accounts[9], 4, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+374, accounts[1], 26, 10000, accounts[7], 6, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([62,32,234,142,163,205,244,125,208,208,220,158,121,215,22,121,13,22,254,27,224,70,189,67,163,116,53,72,75,216,251,61], accounts[3], accounts[9], 4, 28, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 26, 10000, accounts[7], 6, 2,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN _brokerAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    let result = await contractSwaps.createOrder([46,164,151,25,168,35,6,163,139,88,133,51,10,15,90,108,67,84,253,84,142,61,200,54,139,47,88,172,186,139,214,160], accounts[9], accounts[5], 28, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[1], 29, 4038714809, "0x0000000000000000000000000000000000000000", 2, 28,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([46,164,151,25,168,35,6,163,139,88,133,51,10,15,90,108,67,84,253,84,142,61,200,54,139,47,88,172,186,139,214,160], accounts[5], accounts[5], 28, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[1], 29, 4038714809, "0x0000000000000000000000000000000000000000", 2, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([46,164,151,25,168,35,6,163,139,88,133,51,10,15,90,108,67,84,253,84,142,61,200,54,139,47,88,172,186,139,214,160], accounts[9], accounts[5], 0, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[1], 29, 4038714809, "0x0000000000000000000000000000000000000000", 2, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([46,164,151,25,168,35,6,163,139,88,133,51,10,15,90,108,67,84,253,84,142,61,200,54,139,47,88,172,186,139,214,160], accounts[9], accounts[5], 28, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+922, accounts[1], 29, 4038714809, "0x0000000000000000000000000000000000000000", 2, 28,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractSwaps.createOrder([46,164,151,25,168,35,6,163,139,88,133,51,10,15,90,108,67,84,253,84,142,61,200,54,139,47,88,172,186,139,214,160], accounts[9], accounts[5], 28, 254, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[1], 29, 4038714809, "0x0000000000000000000000000000000000000000", 2, 28,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress!=0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await contractSwaps.createOrder([247,110,53,226,0,148,70,122,16,140,196,77,182,22,46,165,241,10,191,134,16,152,245,243,163,9,223,178,192,63,146,119], accounts[0], accounts[4], 10001, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+479, accounts[5], 11, 65, accounts[8], 4038714811, 1,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([247,110,53,226,0,148,70,122,16,140,196,77,182,22,46,165,241,10,191,134,16,152,245,243,163,9,223,178,192,63,146,119], accounts[4], accounts[4], 10001, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+479, accounts[5], 11, 65, accounts[8], 4038714811, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([247,110,53,226,0,148,70,122,16,140,196,77,182,22,46,165,241,10,191,134,16,152,245,243,163,9,223,178,192,63,146,119], accounts[0], accounts[4], 0, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+479, accounts[5], 11, 65, accounts[8], 4038714811, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([247,110,53,226,0,148,70,122,16,140,196,77,182,22,46,165,241,10,191,134,16,152,245,243,163,9,223,178,192,63,146,119], accounts[0], accounts[4], 10001, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+479, accounts[5], 11, 65, accounts[8], 4038714811, 1,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([247,110,53,226,0,148,70,122,16,140,196,77,182,22,46,165,241,10,191,134,16,152,245,243,163,9,223,178,192,63,146,119], accounts[0], accounts[4], 10001, 256, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[5], 11, 65, accounts[8], 4038714811, 1,{from: accounts[0]}),'revert');
  });
  it('Should execute createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) WHEN myWishAddress==0x0000000000000000000000000000000000000000,owners==0x0000000000000000000000000000000000000000,_baseAddress!=_quoteAddress,_baseLimit>0,_quoteLimit>0,_expirationTimestamp>block.timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await contractSwaps.createOrder([19,219,91,29,208,137,128,141,58,53,161,222,249,220,120,24,66,232,137,236,4,159,45,41,220,38,79,69,172,31,83,174], accounts[2], accounts[4], 29, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+250, accounts[2], 10001, 257, accounts[1], 64, 29,{from: accounts[0]});
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseAddress != _quoteAddress', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([19,219,91,29,208,137,128,141,58,53,161,222,249,220,120,24,66,232,137,236,4,159,45,41,220,38,79,69,172,31,83,174], accounts[4], accounts[4], 29, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+250, accounts[2], 10001, 257, accounts[1], 64, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _baseLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([19,219,91,29,208,137,128,141,58,53,161,222,249,220,120,24,66,232,137,236,4,159,45,41,220,38,79,69,172,31,83,174], accounts[2], accounts[4], 0, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+250, accounts[2], 10001, 257, accounts[1], 64, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _quoteLimit > 0', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([19,219,91,29,208,137,128,141,58,53,161,222,249,220,120,24,66,232,137,236,4,159,45,41,220,38,79,69,172,31,83,174], accounts[2], accounts[4], 29, 0, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+250, accounts[2], 10001, 257, accounts[1], 64, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail createOrder(bytes32,address,address,uint,uint,uint,address,uint,uint,address,uint,uint) when NOT comply with: _expirationTimestamp > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    await contractSwaps.setMyWishAddress("0x0000000000000000000000000000000000000000",{from:accounts[0]});
    let result = await truffleAssert.fails(contractSwaps.createOrder([19,219,91,29,208,137,128,141,58,53,161,222,249,220,120,24,66,232,137,236,4,159,45,41,220,38,79,69,172,31,83,174], accounts[2], accounts[4], 29, 1532892064, (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, accounts[2], 10001, 257, accounts[1], 64, 29,{from: accounts[0]}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.value==_amount,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([78,89,36,130,194,65,66,255,170,232,213,41,93,72,117,196,12,32,76,87,232,79,175,40,156,124,99,175,8,18,9,36], "0x0000000000000000000000000000000000000000", 6,{from: accounts[0],value:6});
  });
  it('Should fail deposit(bytes32,address,uint) when NOT comply with: msg.value == _amount', async () => {
    let result = await truffleAssert.fails(contractSwaps.deposit([78,89,36,130,194,65,66,255,170,232,213,41,93,72,117,196,12,32,76,87,232,79,175,40,156,124,99,175,8,18,9,36], "0x0000000000000000000000000000000000000000", 7,{from: accounts[0],value:6}),'revert');
  });
  it('Should execute deposit(bytes32,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractSwaps.deposit([58,184,49,185,253,133,129,50,102,215,142,95,226,248,252,23,16,229,48,255,101,65,175,206,93,7,79,8,67,134,14,75], accounts[4], 95,{from: accounts[0]});
  });
  it('Should execute cancel(bytes32) WHEN msg.sender==owners,isCancelled!=true,isSwapped!=true', async () => {
    let result = await contractSwaps.cancel([29,100,185,237,195,195,156,99,19,203,186,149,128,188,104,172,96,254,136,213,145,66,161,204,102,153,241,244,53,100,183,181],{from: 0});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([184,44,218,86,146,252,117,232,214,188,49,45,159,19,132,57,130,187,230,16,7,140,179,9,221,177,129,72,250,181,10,123], accounts[3],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([30,173,211,109,239,12,218,150,57,65,195,25,129,22,202,21,180,244,5,123,5,67,157,10,223,114,72,149,135,150,237,128], accounts[1],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment>0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([41,208,114,188,236,126,131,232,14,198,121,105,47,107,108,239,135,45,132,87,79,248,121,218,31,112,22,49,181,229,34,174], accounts[7],{from: accounts[0]});
  });
  it('Should execute refund(bytes32,address) WHEN investment<=0,isSwapped!=true', async () => {
    let result = await contractSwaps.refund([155,31,224,116,241,188,80,17,163,243,240,55,79,239,187,13,70,161,163,46,92,15,104,6,105,118,207,40,73,1,220,61], accounts[8],{from: accounts[0]});
  });
  it('Should execute setVault(Vault) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setVault(contractVault.address,{from: accounts[0]});
  });
  it('Should fail setVault(Vault) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setVault(contractVault.address,{from: accounts[9]}),'revert');
  });
  it('Should execute setMyWishPercents(uint,uint) WHEN msg.sender==_owner,_basePercent<=10000,_quotePercent<=10000', async () => {
    let result = await contractSwaps.setMyWishPercents(1338, 256,{from: accounts[0]});
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1338, 256,{from: accounts[9]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _basePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(10001, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail setMyWishPercents(uint,uint) when NOT comply with: _quotePercent <= 10000', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishPercents(1338, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute setMyWishAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractSwaps.setMyWishAddress(accounts[1],{from: accounts[0]});
  });
  it('Should fail setMyWishAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSwaps.setMyWishAddress(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute createKey(address)', async () => {
    let result = await contractSwaps.createKey(accounts[2],{from: accounts[0]});
  });
  it('Should execute allBrokersBasePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersBasePercent([112,67,130,203,0,60,121,52,122,124,112,235,136,11,123,216,121,68,224,115,131,202,151,22,89,158,67,225,169,61,183,31],{from: accounts[0]});
  });
  it('Should execute allBrokersQuotePercent(bytes32)', async () => {
    let result = await contractSwaps.allBrokersQuotePercent([233,69,225,245,28,230,182,56,176,58,16,150,171,71,205,50,225,9,48,221,96,235,18,245,2,57,68,159,66,161,220,101],{from: accounts[0]});
  });
  it('Should execute baseLimit(bytes32)', async () => {
    let result = await contractSwaps.baseLimit([59,177,59,238,98,200,168,201,5,56,111,113,228,202,130,206,147,64,62,48,10,67,172,54,106,225,41,98,71,155,161,38],{from: accounts[0]});
  });
  it('Should execute quoteLimit(bytes32)', async () => {
    let result = await contractSwaps.quoteLimit([214,31,149,206,32,49,0,218,11,40,171,251,199,70,110,169,34,245,49,192,117,36,155,246,70,129,77,253,246,34,102,91],{from: accounts[0]});
  });
  it('Should execute baseRaised(bytes32)', async () => {
    let result = await contractSwaps.baseRaised([100,216,25,227,242,38,59,136,21,14,249,214,71,163,58,228,42,223,84,187,199,68,28,162,63,2,147,203,173,126,83,3],{from: accounts[0]});
  });
  it('Should execute quoteRaised(bytes32)', async () => {
    let result = await contractSwaps.quoteRaised([148,9,228,50,149,130,204,144,213,58,106,223,241,105,33,93,197,77,246,177,40,22,182,74,67,161,57,137,252,174,25,201],{from: accounts[0]});
  });
  it('Should execute isBaseFilled(bytes32)', async () => {
    let result = await contractSwaps.isBaseFilled([148,133,146,88,22,58,229,37,22,79,228,58,50,193,41,203,235,45,95,44,33,33,128,47,33,236,231,216,253,198,225,125],{from: accounts[0]});
  });
  it('Should execute isQuoteFilled(bytes32)', async () => {
    let result = await contractSwaps.isQuoteFilled([26,178,41,13,122,69,168,197,95,156,215,230,88,19,160,176,44,179,153,21,64,243,25,249,47,199,33,35,46,63,93,38],{from: accounts[0]});
  });
  it('Should execute baseInvestors(bytes32)', async () => {
    let result = await contractSwaps.baseInvestors([246,31,47,175,63,34,60,117,51,225,146,37,176,187,133,53,10,196,214,206,183,140,121,146,140,15,204,214,73,127,137,172],{from: accounts[0]});
  });
  it('Should execute quoteInvestors(bytes32)', async () => {
    let result = await contractSwaps.quoteInvestors([90,93,161,97,169,179,242,97,45,180,45,229,234,39,222,240,83,189,133,52,162,89,167,61,230,8,213,67,98,81,23,78],{from: accounts[0]});
  });
  it('Should execute baseUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.baseUserInvestment([232,247,44,205,222,214,81,230,144,65,60,147,54,127,146,215,251,26,203,6,170,32,212,86,179,146,33,137,16,38,137,124], accounts[7],{from: accounts[0]});
  });
  it('Should execute quoteUserInvestment(bytes32,address)', async () => {
    let result = await contractSwaps.quoteUserInvestment([29,248,130,237,114,15,114,62,205,241,151,27,161,254,214,30,134,241,125,2,157,125,197,26,23,53,214,117,248,184,106,79], accounts[2],{from: accounts[0]});
  });
  it('Should execute orderBrokers(bytes32)', async () => {
    let result = await contractSwaps.orderBrokers([238,251,199,212,153,69,169,178,127,107,42,39,170,236,105,96,194,190,241,25,96,215,220,39,20,91,133,1,243,93,63,60],{from: accounts[0]});
  });
});
